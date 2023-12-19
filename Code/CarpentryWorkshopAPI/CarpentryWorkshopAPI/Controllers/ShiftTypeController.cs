using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Drawing.Text;
using System.Net.WebSockets;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class ShiftTypeController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public ShiftTypeController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllShiftTyoe()
        {
            try
            {
                var types = _context.ShiftTypes
                    .Select(t => new CreateShiftTypeDTO
                    {
                        ShiftTypeId = t.ShiftTypeId,
                        TypeName = t.TypeName,
                        Status = t.Status,
                        StartTimestring = DateTime.Parse(t.StartTime.ToString()).ToString("HH':'mm':'ss"),
                        EndTimestring = DateTime.Parse(t.EndTime.ToString()).ToString("HH':'mm':'ss")
                    });
                if (types == null)
                {
                    return NotFound();
                }
                return Ok(types);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi hiển thị danh sách");
            }

        }
        [HttpGet]
        public IActionResult GetShiftTypeById(int id)
        {
            try
            {
                var types = _context.ShiftTypes
                    .Where(st=>st.ShiftTypeId == id)    
                    .Select(t => new CreateShiftTypeDTO
                    {
                        ShiftTypeId = t.ShiftTypeId,
                        TypeName = t.TypeName,
                        Status = t.Status,
                        StartTimestring = DateTime.Parse(t.StartTime.ToString()).ToString("HH':'mm':'ss"),
                        EndTimestring = DateTime.Parse(t.EndTime.ToString()).ToString("HH':'mm':'ss")
                    }).FirstOrDefault();
                if (types == null)
                {
                    return NotFound();
                }
                return Ok(types);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi hiển thị danh sách");
            }

        }
        [HttpPost]
        public IActionResult CreateAndUpdateShiftType([FromBody] CreateShiftTypeDTO createShiftTypeDTO)
        {
            try
            {
                if (createShiftTypeDTO.ShiftTypeId == 0)
                {
                    var type = _mapper.Map<ShiftType>(createShiftTypeDTO);
                    if (type == null)
                    {
                        return NotFound();
                    }
                    _context.ShiftTypes.Add(type);
                    _context.SaveChanges();
                    HistoryChangeShiftType history = new HistoryChangeShiftType
                    {
                        ShiftTypeId = type.ShiftTypeId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeShiftTypes.Add(history);
                    _context.SaveChanges();
                    return Ok("Tạo ca làm việc thành công");
                }
                else
                {
                    var type = _mapper.Map<ShiftType>(createShiftTypeDTO);
                    if (type == null)
                    {
                        return NotFound();
                    }
                    _context.ShiftTypes.Update(type);
                    HistoryChangeShiftType history = new HistoryChangeShiftType
                    {
                        ShiftTypeId = type.ShiftTypeId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeShiftTypes.Add(history);
                    _context.SaveChanges();
                    return Ok("Chỉnh sửa ca làm việc thành công");

                }

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi tạo hoặc chỉnh sửa ca làm việc");
            }
        }
        [HttpGet]
        public IActionResult Filter(bool status)
        {
            try
            {
                var types = _context.ShiftTypes
                    .Where(x => x.Status == status)
                    .ToList();
                if (types == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<CreateShiftTypeDTO>>(types);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi lọc");
            }
        }
        //[HttpGet]
        //public async Task<IActionResult> GetTeamShift(int teamId)
        //{
        //    try
        //    {
        //        List<Object> result = new List<object>();
        //        var team = await _context.Teams
        //            .Include(t=>t.EmployeeTeams)
        //            .ThenInclude(t => t.Employee)
        //            .Include(t=>t.WorkSchedules)
        //            .Select(t => new
        //        {
        //            TeamId = t.TeamId,
        //            NmuberOfEmployee = t.EmployeeTeams.Where(t=>t.EndDate == null).Distinct().Count(),
        //            Employee = t.EmployeeTeams.Where(t=>t.EndDate == null).Select(et => new
        //            {
        //                EmployeeName = et.Employee.FirstName + " " + et.Employee.LastName,
        //                EmployeeId = et.Employee.EmployeeId,
        //            })
        //        }).ToListAsync();

        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Lỗi lọc");
        //    }
        //}
    }
}
