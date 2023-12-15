using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class WorksController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;

        public WorksController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> GetAllWorks([FromBody] WorkInputDTO workInputDTO)
        {
            try
            {
                if (workInputDTO.Id <= 0)
                {
                    return BadRequest("Mã nhân viên không hợp lệ");
                }
                if (string.IsNullOrEmpty(workInputDTO.Date))
                {
                    return BadRequest("Dữ liệu không hợp lệ");
                }
                string[] split = workInputDTO.Date.Split('-');
                string start = split[0];
                string end = split[1];
                string role = "Trưởng phòng sản xuất";
                var department = await _context.RolesEmployees
                    .Include(re => re.Role)
                    .Include(re => re.Department)
                    .Where(re => re.EmployeeId == workInputDTO.Id && re.EndDate == null && re.Role.RoleName.ToLower().Equals(role.ToLower()))
                    .Select(re => new
                    {
                        DepartmentId = re.DepartmentId,
                        DepartmentName = re.Department.DepartmentName,
                    })
                    .FirstOrDefaultAsync();

                if (department == null)
                {
                    return NotFound("Không tìm thấy phòng ban");
                }

                var work = await _context.Works
                 .Where(de => de.DepartmentId == department.DepartmentId)
                 .Include(w => w.UniCost)
                 .Include(w => w.WorkArea)
                 .Include(w => w.TeamWorks)
                 .ThenInclude(w => w.Team)
                 .ThenInclude(w=>w.EmployeeTeams)
                 .ThenInclude(w=>w.Employee)
                 .ToListAsync();  // Use ToListAsync here to asynchronously fetch the data
                var endDate = DateTime.ParseExact(end + "/" + workInputDTO.Year, "dd/MM/yyyy",
                                  System.Globalization.CultureInfo.InvariantCulture);
                var startDate = DateTime.ParseExact(start + "/" + workInputDTO.Year, "dd/MM/yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);

                work = work.Where(w => w.TeamWorks.Any(tw => tw.Date.HasValue && tw.Date.Value >= startDate && tw.Date.Value <= endDate) && 
                w.TeamWorks.Any( tw => tw.Team.EmployeeTeams.Any(et => et.Employee.RolesEmployees.Any(re => re.DepartmentId == department.DepartmentId && re.EndDate == null)))).ToList();

                if (workInputDTO.Year > 0)
                {
                    work = work.Where(w => w.TeamWorks.Any(tw => tw.Date.HasValue && tw.Date.Value.Year == workInputDTO.Year) ).ToList();
                }
                var result = work.Select(w => new
                {
                    WorkId = w.WorkId,
                    WorkName = w.WorkName,
                    NumberProduct = w.TeamWorks.Sum(e => e.TotalProduct),
                    TeamName = w.TeamWorks.Select(tw => tw.Team.TeamName).Distinct(),
                    TotalProduct = w.TotalProduct,
                    UniCostName = w.UniCost.UnitName,
                    WorkArea = w.WorkArea.WorkAreaName,
                    Department = department.DepartmentName,
                    Date = w.TeamWorks.Select(tw => tw.Date.Value.ToString("dd'-'MM'-'yyyy")).FirstOrDefault(),
                    Status = w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.Date > DateTime.Now.Date
                                    ? "WorkNotStart"
                                    : (w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.Date < DateTime.Now.Date
                                        ? "WorkEnd"
                                        : ((w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.Date > DateTime.Now.Date && w.TeamWorks.Sum(e => e.TotalProduct) >= w.TotalProduct)
                                            ? "Done"
                                            : "NotDone")),
                }).OrderBy(e=>e.Date).ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }
        }

        [HttpGet("{wId}")]
        public IActionResult GetWorkDetailById(int wId)
        {
            try
            {
                if (wId <= 0)
                {
                    return BadRequest("Mã công việc không hợp lệ");
                }
                var work = _context.Works.Where(w => w.WorkId == wId).Include(w => w.UniCost).Include(w => w.WorkArea).Include(w => w.TeamWorks).ThenInclude(w => w.Team)
                    .Select(w => new
                    {
                        WorkId = w.WorkId,
                        WorkName = w.WorkName,
                        NumberProduct = w.TeamWorks != null ? w.TeamWorks.Sum(e => e.TotalProduct) : 0,
                        TeamName = w.TeamWorks.Select(tw => tw.Team.TeamName).Distinct(),
                        TotalProduct = w.TotalProduct,
                        Cost = w.Cost,
                        UniCostName = w.UniCost.UnitName,
                        UnitCostId = w.UniCost.UniCostId,
                        WorkArea = w.WorkArea.WorkAreaName,
                        WorkAreaId = w.WorkArea.WorkAreaId,
                        //TimeStart = w.StartDate.HasValue ? w.StartDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                        //TimeEnd = w.EndDate.HasValue ? w.EndDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                        Date = w.TeamWorks != null ? w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.ToString("dd-MM-yyyy") : "",
                        Status = w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.Date > DateTime.Now.Date ? "WorkNotStart" :
                        (w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.Date < DateTime.Now.Date ? "WorkEnd" :
                        ((w.TeamWorks.OrderByDescending(tw => tw.Date).FirstOrDefault().Date.Value.Date > DateTime.Now.Date && w.TeamWorks.Sum(e => e.TotalProduct) >= w.TotalProduct)
                        ? "Done" : "NotDone")),
                        DepartmentId = w.DepartmentId,
                    }).FirstOrDefault();
                if (work == null)
                {
                    return NotFound("Mã công việc không tồn tại");
                }
                return Ok(work);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }

        }
        [HttpGet("{teamId}/{employeeId}")]
        public IActionResult GetWorkDetailForTeamById(int teamId, int employeeId)
        {
            try
            {
                if (teamId <= 0 || employeeId <= 0)
                {
                    return BadRequest("Dữ liệu không hợp lệ");
                }
                var department = _context.RolesEmployees.Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == employeeId && re.Role.RoleName == "Trưởng phòng" && re.EndDate == null).Select(re => new
                {
                    DepartmentId = re.DepartmentId,
                    DepartmentName = re.Department.DepartmentName,
                }).FirstOrDefault();
                if (department == null)
                {
                    return NotFound("Không tìm thấy phòng ban");
                }
                var worklSchedule = _context.WorkSchedules.Include(ws => ws.ShiftType).Where(ws => ws.StartDate <= DateTime.Now && ws.EndDate == null && ws.TeamId == teamId)
                    .Select(ws => new
                    {
                        StartTime = ws.ShiftType.StartTime,
                        Endtime = ws.ShiftType.EndTime,
                    }).FirstOrDefault();

                var work = _context.Works.Include(w => w.UniCost).Include(w => w.WorkArea).Include(w => w.TeamWorks).ThenInclude(w => w.Team)
                    .Where(de => de.DepartmentId == department.DepartmentId)
                    .Select(w => new
                    {
                        WorkId = w.WorkId,
                        TimeStart = w.StartDate.HasValue ? w.StartDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                        TimeEnd = w.EndDate.HasValue ? w.EndDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                        TimeRemain = w.StartDate > DateTime.Now ? (int)(w.StartDate - w.EndDate).Value.TotalDays : (w.EndDate < DateTime.Now ? 0 : (int)(w.EndDate - DateTime.Now).Value.TotalDays),
                    }).ToList();
                var workForTeam = work.Where(w => w.TimeRemain > 0);
                if (worklSchedule.StartTime > worklSchedule.Endtime)
                {
                    workForTeam = work.Where(w => w.TimeRemain > 2);
                }

                return Ok(workForTeam);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }

        }
        //[HttpGet("{wId}")]
        //public async Task<ActionResult<IEnumerable<object>>> GetWorkById(int wId)
        //{
        //    var work = await _context.Works.Where(w=>w.WorkId == wId).Include(w => w.UniCost).Include(w => w.WorkArea).Include(w => w.TeamWorks).AsQueryable().ToListAsync();
        //    if(work == null)
        //    {
        //        return NotFound();
        //    }
        //    var result = new List<object>();
        //    var teamList = new List<object>();
        //    var teamListId = work.SelectMany(w=>w.TeamWorks.Select(tw => tw.TeamId).Distinct()).ToList();
        //    foreach (var id in teamListId)
        //    {
        //        var team = await _context.Teams.Include(t => t.TeamWorks).FirstOrDefaultAsync(t=>t.TeamId == id);
        //        if(team == null)
        //        {
        //            return NotFound(id);
        //        }
        //        teamList.Add(new
        //        {
        //            TeamId = id,
        //            TeamName = team.TeamName,
        //            TeamProduct = team.TeamWorks.Sum(tw=>tw.TotalProduct),
        //            Date = team.TeamWorks.Select(tw=>tw.Date).ToList(),

        //        });
        //    };
        //    result.Add(new
        //    {
        //        Team = teamList,
        //        UnitName = work.Select(w=>w.UniCost.UnitName),
        //        TotalProduct = work.Select(w => w.TeamWorks.Sum(tw=>tw.TotalProduct)).Single(),
        //        UniCostName = work.Select(w => w.UniCost.UnitName).Single(),
        //        WorkArea = work.Select(w => w.WorkArea.WorkAreaName).Single(),
        //    });
        //    return Ok(result);
        //}
        [HttpPost]
        public IActionResult AddWork([FromBody] WorkDTO workDTO)
        {
            try
            {

                var department = _context.RolesEmployees.Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == workDTO.EmployeeId && re.Role.RoleName == "Trưởng phòng" && re.EndDate == null).Select(re => new
                {
                    DepartmentId = re.DepartmentId,
                    DepartmentName = re.Department.DepartmentName,
                }).FirstOrDefault();
                if (department == null)
                {
                    return NotFound("Không tìm thấy phòng ban");
                }
                var work = _mapper.Map<Work>(workDTO);
                work.StartDate = !string.IsNullOrEmpty(workDTO.StartDateString) ? DateTime.ParseExact(workDTO.StartDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) : null;
                work.EndDate = !string.IsNullOrEmpty(workDTO.EndDateString) ? DateTime.ParseExact(workDTO.EndDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) : null;
                work.DepartmentId = department.DepartmentId;
                _context.Works.Add(work);
                _context.SaveChanges();
                if (string.IsNullOrEmpty(workDTO.DateString))
                {
                    return BadRequest("Định dạng ngày không hợp lệ");
                }
                TeamWork newTw = new TeamWork()
                {
                    TeamWorkId = 0,
                    TeamId = workDTO.TeamId,
                    WorkId = work.WorkId,
                    TotalProduct = 0,
                    Date = DateTime.ParseExact(workDTO.DateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture),
                };
                _context.TeamWorks.Add(newTw);
                _context.SaveChanges();
                return Ok("Thêm công việc thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPut]
        public IActionResult UpdateWork([FromBody] WorkDTO workDTO)
        {
            try
            {
                var work = _context.Works.FirstOrDefault(w => w.WorkId == workDTO.WorkId);
                if (work == null)
                {
                    return NotFound("Không tìm thấy công việc");
                }
                work.WorkAreaId = workDTO.WorkAreaId > 0 ? workDTO.WorkAreaId : work.WorkAreaId;
                work.WorkName = !string.IsNullOrEmpty(workDTO.WorkName) ? workDTO.WorkName : work.WorkName;
                work.StartDate = !string.IsNullOrEmpty(workDTO.StartDateString) ? DateTime.ParseExact(workDTO.StartDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) : work.StartDate;
                work.EndDate = !string.IsNullOrEmpty(workDTO.StartDateString) ? DateTime.ParseExact(workDTO.EndDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) : work.EndDate;
                work.UniCostId = workDTO.UniCostId > 0 ? workDTO.UniCostId : work.UniCostId;
                work.TotalProduct = workDTO.TotalProduct > 0 ? workDTO.TotalProduct : work.TotalProduct;
                work.Cost = workDTO.Cost > 0 ? workDTO.Cost : work.Cost;
                work.Note = !string.IsNullOrEmpty(workDTO.Note) ? workDTO.Note : work.Note;
                _context.Works.Update(work);
                _context.SaveChanges();
                return Ok("Chỉnh sửa công việc thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }

    }
}
