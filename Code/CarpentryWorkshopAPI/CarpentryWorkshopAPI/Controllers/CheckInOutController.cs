using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.InkML;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class CheckInOutController : ControllerBase
    {

        private readonly SEPG4CWMSContext _context;
        private IMapper _mapper;
        public CheckInOutController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //[HttpGet]
        //public IActionResult GetAllCheckInOut()
        //{
        //    try
        //    {
        //        var allchecks = _context.CheckInOuts
        //            .Include(x => x.Employee)
        //            .ToList();
        //        if (allchecks == null)
        //        {
        //            return NotFound();
        //        }
        //        return Ok(allchecks);
        //    }catch(Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpGet]
        //[Route("api/attendance/{employeeId}")]
        //public IActionResult GetAttendanceStatus(int employeeId)
        //{
        //    DateTime currentDate = DateTime.Now.Date;

        //    var lastAttendance = _context.CheckInOuts
        //        .Where(a => a.EmployeeId == employeeId && a.Date == currentDate)
        //        .OrderByDescending(a => a.TimeCheckIn)
        //        .FirstOrDefault();
        //    var team = _context.EmployeeTeams.Where(et => et.EmployeeId == employeeId && et.EndDate == null)
        //        .Include(et => et.Team).ThenInclude(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Select(et => new
        //        {
        //            TimeIn = et.Team.WorkSchedules.Select(ws=>ws.ShiftType.StartTime).Single(),
        //            Timeout = et.Team.WorkSchedules.Select(ws =>ws.ShiftType.EndTime).Single(),
        //        });
        //    if (lastAttendance == null)
        //    {
        //        if (DateTime.Now.TimeOfDay > team.Select(t => t.TimeIn.Value).Single())
        //        {
        //            return Ok("Vắng mặt");
        //        }
        //        // Trường hợp người dùng chưa check-in
        //        return Ok("Chưa có mặt");
        //    }
        //    else
        //    {
        //        if(lastAttendance.TimeCheckOut == null)
        //        {
        //            if (DateTime.Now.TimeOfDay > team.Select(t => t.Timeout.Value).Single())
        //            {
        //                return Ok("Vắng mặt");
        //            }
        //            return Ok("Có mặt");
        //        }else
        //        {
        //            return Ok("Nhân viên đã check out");
        //        }
        //    }

        //}
        [Authorize(Roles = "TimeKeeping")]

        [HttpGet("GetEmployeesByTeamLeaderId/{teamLeaderId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetEmployeesByTeamLeaderIdOrTeamSubLeaderId(int teamLeaderId)
        {
            var personCheckInOut = _context.RolesEmployees.Include(re => re.Role).Include(re=>re.Department).Where(re => re.EmployeeId == teamLeaderId && re.Role.RoleName.Contains("Trưởng phòng") && re.EndDate == null && re.Department.IsOffice != 4).FirstOrDefault();
            if (personCheckInOut == null)
            {
                var teamId = await _context.Teams
                .Where(t => t.TeamLeaderId == teamLeaderId || t.TeamSubLeaderId == teamLeaderId)
                .Include(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Include(et => et.TeamWorks).ThenInclude(et => et.Work)
                .Include(et=>et.EmployeeTeams)
                .Where(t=>t.EmployeeTeams.Any(et=>et.EndDate == null))
                .Select(et => new
                {
                    TimeIn = et.WorkSchedules.Select(ws => ws.ShiftType.StartTime).Single(),
                    Timeout = et.WorkSchedules.Select(ws => ws.ShiftType.EndTime).Single(),
                    TeamId = et.TeamId,
                    WorkId = et.TeamWorks.Select(w => w.WorkId),
                })
                .FirstOrDefaultAsync();
                if(teamId == null)
                {
                    return NotFound("Không tìm thấy thông tin nhóm");
                }
                if (teamId.TeamId <= 0)
                {
                    return NotFound("Không tìm thấy thông tin mã nhóm");
                }
                DateTime DateIn = DateTime.Now.Date.Add(teamId.TimeIn ?? TimeSpan.Zero);
                DateTime DateOut = DateTime.Now.Date.Add(teamId.Timeout ?? TimeSpan.Zero);
                if (teamId.Timeout < teamId.TimeIn)
                {
                    DateOut = DateOut.AddDays(1);
                }
                var employees = await _context.EmployeeTeams
                    .Include(et=>et.Employee)
                    .ThenInclude(et=>et.RolesEmployees)
                    .Where(et => et.TeamId == teamId.TeamId && et.EndDate == null && et.Employee.Status == true && et.Employee.RolesEmployees.Any(re=>re.EndDate == null))
                    .Select(et => et.Employee)
                    .ToListAsync();
                if (employees.Count() == 0)
                {
                    return NotFound("Không tìm thấy nhân viên trong nhóm có ngày kết thúc trống");
                }
                var result = new List<object>();
                var time = new List<object>();
                foreach (var employee in employees)
                {
                    var currentDate = DateTime.Now.Date;

                    var checkInTime = await _context.CheckInOuts
                        .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                        .OrderBy(c => c.Date)
                        .ThenBy(c => c.TimeCheckIn)
                        .Select(c => c.TimeCheckIn)
                        .FirstOrDefaultAsync();

                    var latestCheckOutTime = await _context.CheckInOuts
                        .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                        .OrderBy(c => c.Date)
                        .ThenBy(c => c.TimeCheckIn)
                        .LastOrDefaultAsync();

                    if (DateTime.Now > DateOut && latestCheckOutTime != null && latestCheckOutTime.TimeCheckIn != null)
                    {
                        if (latestCheckOutTime.TimeCheckOut == null)
                        {
                            var AutoCheck = await _context.CheckInOuts
                                .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                                .OrderBy(c => c.Date)
                                .ThenBy(c => c.TimeCheckIn)
                                .LastOrDefaultAsync();
                            if (AutoCheck != null)
                            {
                                AutoCheck.TimeCheckOut = teamId.Timeout;
                                _context.Update(AutoCheck);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (teamId.WorkId.Count() <= 0)
                    {
                        result.Add(new
                        {
                            EmployeeId = employee.EmployeeId,
                            Name = employee.LastName + " " + employee.FirstName,
                            Status = 4, //Chưa có công việc
                            CheckStatus = "CheckIn",
                            TimeIn = "",
                            Timeout = "",

                        });
                    }
                    else if (checkInTime == null)
                    {
                        if (DateTime.Now > DateOut)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 6,//tan ca 
                                CheckStatus = "EndCheck",
                                TimeIn = "",
                                Timeout = "",

                            });
                        }
                        else if (DateTime.Now > DateIn && DateTime.Now < DateOut)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 3, //Vắng mặt
                                CheckStatus = "CheckIn",
                                TimeIn = "",
                                Timeout = "",
                            });
                        }
                        else if (DateTime.Now.AddMinutes(5) < DateIn)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 7, //Chưa đến ca
                                CheckStatus = "EndCheck",
                                TimeIn = "",
                                Timeout = "",

                            });
                        }
                        else 
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 1, //Checkin
                                CheckStatus = "CheckIn",
                                TimeIn = "",
                                Timeout = "",

                            });
                        }
                    }
                    else
                    {
                        if (DateTime.Now > DateOut)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 6,//tan ca
                                CheckStatus = "EndCheck",
                                TimeIn = latestCheckOutTime.TimeCheckOut,
                                Timeout = DateTime.Now.TimeOfDay,

                            });
                        }
                        else if (latestCheckOutTime.TimeCheckOut == null)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 2,// dang co mat
                                CheckStatus = "CheckOut",
                                TimeIn = latestCheckOutTime.TimeCheckIn,
                                Timeout = "",

                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 5,//tam ngung 
                                CheckStatus = "CheckIn",
                                TimeIn = latestCheckOutTime.TimeCheckIn,
                                Timeout = latestCheckOutTime.TimeCheckOut,

                            });
                        }
                    }

                }
                time.Add(new
                {
                    TimeIn = teamId.TimeIn,
                    Timeout = teamId.Timeout,
                    Date = DateTime.Now.Date.ToString("dd'-'MM'-'yyyy"),
                    Result = result
                });
               if(time == null)
                {
                    return Ok(Enumerable.Empty<object>());
                }               
                return time;

            }
            else
            {
                var employees = await _context.RolesEmployees.Include(e => e.Employee).Include(e => e.Role).Include(e=>e.Department).Where(e => e.DepartmentId == personCheckInOut.DepartmentId && e.EndDate == null && e.Employee.Status == true).Select(e => e.Employee).Distinct().ToListAsync();
                if (employees.Count() == 0)
                {
                    return NotFound("Không tìm thấy nhân viên trong nhóm có ngày kết thúc trống");
                }
                var result = new List<object>();
                var time = new List<object>();
                TimeSpan timeIn = new TimeSpan(7, 0, 0);
                TimeSpan timeOut = new TimeSpan(16, 0, 0);
                foreach (var employee in employees)
                {
                    var employeeRole = _context.RolesEmployees.Include(re => re.Role).OrderBy(re => re.Role.RoleLevel).FirstOrDefault(re => (re.Role.RoleName == "Trưởng ca" || re.Role.RoleName == "Phó ca") && re.EmployeeId == employee.EmployeeId);
                    if (employeeRole != null)
                    {
                        var teamId = await _context.Teams
                            .Where(t => t.TeamLeaderId == employee.EmployeeId || t.TeamSubLeaderId == employee.EmployeeId)
                            .Include(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Include(et => et.TeamWorks).ThenInclude(et => et.Work)
                            .Select(et => new
                            {
                                TimeIn = et.WorkSchedules.Select(ws => ws.ShiftType.StartTime).Single(),
                                Timeout = et.WorkSchedules.Select(ws => ws.ShiftType.EndTime).Single(),
                                TeamId = et.TeamId,
                            })
                             .FirstOrDefaultAsync();
                        if (teamId != null)
                        {
                            timeIn = teamId.TimeIn ?? TimeSpan.Zero;
                            timeOut = teamId.Timeout ?? TimeSpan.Zero;
                        }
                    }
                    DateTime DateIn = DateTime.Now.Date.Add(timeIn);
                    DateTime DateOut = DateTime.Now.Date.Add(timeOut);
                    var currentDate = DateTime.Now.Date;
                    var checkInTime = await _context.CheckInOuts
                        .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                        .OrderBy(c => c.Date)
                        .ThenBy(c => c.TimeCheckIn)
                        .Select(c => c.TimeCheckIn)
                        .FirstOrDefaultAsync();

                    var latestCheckOutTime = await _context.CheckInOuts
                        .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                        .OrderBy(c => c.Date)
                        .ThenBy(c => c.TimeCheckIn)
                        .LastOrDefaultAsync();
                    if (DateTime.Now > DateOut && latestCheckOutTime != null && latestCheckOutTime.TimeCheckIn != null)
                    {
                        if (latestCheckOutTime.TimeCheckOut == null)
                        {
                            var AutoCheck = await _context.CheckInOuts
                                .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                                .OrderBy(c => c.Date)
                                .ThenBy(c => c.TimeCheckIn)
                                .LastOrDefaultAsync();
                            if (AutoCheck != null)
                            {
                                AutoCheck.TimeCheckOut = timeOut;
                                _context.Update(AutoCheck);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (checkInTime == null)
                    {
                        if (DateTime.Now > DateOut)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 6,//tan ca 
                                CheckStatus = "EndCheck",
                                TimeIn = "",
                                Timeout = "",

                            });
                        }
                        else if (DateTime.Now > DateIn && DateTime.Now < DateOut)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 3, //Vắng mặt
                                CheckStatus = "CheckIn",
                                TimeIn = "",
                                Timeout = "",
                            });
                        }
                        else if (DateTime.Now.AddMinutes(5) < DateIn)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 7, //Chưa đến ca
                                CheckStatus = "EndCheck",
                                TimeIn = "",
                                Timeout = "",

                            });
                        }
                        else 
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 1, //Checkin
                                CheckStatus = "CheckIn",
                                TimeIn = "",
                                Timeout = "",

                            });
                        }
                    }
                    else
                    {
                        if (DateTime.Now > DateOut)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 6,//tan ca
                                CheckStatus = "EndCheck",
                                TimeIn = latestCheckOutTime.TimeCheckOut,
                                Timeout = DateTime.Now.TimeOfDay,
                            });
                        }
                        else if (latestCheckOutTime.TimeCheckOut == null)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 2,// dang co mat
                                CheckStatus = "CheckOut",
                                TimeIn = latestCheckOutTime.TimeCheckIn,
                                Timeout = "",

                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 5,//tam ngung 
                                CheckStatus = "CheckIn",
                                TimeIn = latestCheckOutTime.TimeCheckIn,
                                Timeout = latestCheckOutTime.TimeCheckOut,

                            });
                        }
                    }
                }
                time.Add(new
                {
                    TimeIn = timeIn.ToString("hh':'mm"),
                    Timeout = timeOut.ToString("hh':'mm"),
                    Date = DateTime.Now.Date.ToString("dd'-'MM'-'yyyy"),
                    Result = result
                });
                if (time == null)
                {
                    return Ok(Enumerable.Empty<object>());
                }
                return time;
            }
        }

        [Authorize(Roles = "TimeKeeping")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAllEmployeesCheckInOut()
        {
            var result = new List<object>();
            foreach (var Id in _context.Teams.Select(t => t.TeamId).ToList())
            {
                var teamId = await _context.Teams
                .Where(t => t.TeamId == Id)
                .Include(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Include(et => et.TeamWorks).ThenInclude(et => et.Work)
                .Select(et => new
                {
                    TimeIn = et.WorkSchedules.Where(ws => ws.EndDate == null).Select(ws => ws.ShiftType.StartTime).Single(),
                    Timeout = et.WorkSchedules.Where(ws => ws.EndDate == null).Select(ws => ws.ShiftType.EndTime).Single(),
                    TeamId = et.TeamId,
                    WorkId = et.TeamWorks.Select(w => w.WorkId)
                })
                .FirstOrDefaultAsync();

                if (teamId.TeamId == 0)
                {
                    return NotFound("Không tìm thấy thông tin mã nhóm");
                }

                var employees = await _context.EmployeeTeams
                    .Where(et => et.TeamId == teamId.TeamId && et.EndDate == null)
                    .Select(et => et.Employee)
                    .ToListAsync();

                //if (employees.Count == 0)
                //{
                //    return NotFound("No employees found in the team with EndDate == null");
                //}


                foreach (var employee in employees)
                {
                    var currentDate = DateTime.Now.Date;

                    var checkInTime = await _context.CheckInOuts
                        .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                        .OrderBy(c => c.Date)
                        .ThenBy(c => c.TimeCheckIn)
                        .Select(c => c.TimeCheckIn)
                        .FirstOrDefaultAsync();

                    var latestCheckOutTime = await _context.CheckInOuts
                        .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                        .OrderBy(c => c.Date)
                        .ThenBy(c => c.TimeCheckIn)
                        .Select(c => c.TimeCheckOut)
                        .LastOrDefaultAsync();
                    if (DateTime.Now.TimeOfDay > teamId.Timeout)
                    {
                        if (latestCheckOutTime == null)
                        {
                            var AutoCheck = await _context.CheckInOuts
                                .Where(c => c.EmployeeId == employee.EmployeeId && c.Date == currentDate)
                                .OrderBy(c => c.Date)
                                .ThenBy(c => c.TimeCheckIn)
                                .LastOrDefaultAsync();
                            if (AutoCheck != null)
                            {
                                AutoCheck.TimeCheckOut = teamId.Timeout;
                                _context.Update(AutoCheck);
                                _context.SaveChanges();
                            }
                        }
                    }
                    if (teamId.WorkId.Count() <= 0)
                    {
                        result.Add(new
                        {
                            EmployeeId = employee.EmployeeId,
                            Name = employee.LastName + " " + employee.FirstName,
                            Status = 4,
                            CheckStatus = "CheckIn"
                        });
                    }
                    else if (checkInTime == null)
                    {
                        if (DateTime.Now.TimeOfDay > teamId.TimeIn)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 3,
                                CheckStatus = "CheckIn"
                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 1,
                                CheckStatus = "CheckIn"
                            });
                        }
                    }

                    else
                    {
                        if (DateTime.Now.TimeOfDay > teamId.Timeout)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 6,//tan ca
                                CheckStatus = "EndCheck"
                            });
                        }
                        else if (latestCheckOutTime == null)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 2,//Checkout
                                CheckStatus = "CheckOut"
                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.LastName + " " + employee.FirstName,
                                Status = 5,//tam vang
                                CheckStatus = "CheckIn"
                            });
                        }

                    }

                }
            }
            return result;
        }
        //[HttpGet("{employeeId}/{date}")]
        //public IActionResult GetCheckInOutForEmoployeeId(int employeeId, string date)
        //{
        //    try
        //    {
        //        DateTime datetime = DateTime.ParseExact(date, "dd-MM-yyyy",
        //                               System.Globalization.CultureInfo.InvariantCulture);
        //        var checkInOut = _context.CheckInOuts.Where(a => a.Date.Value.Date == datetime && a.EmployeeId == employeeId).AsQueryable();
        //        var checkIn = checkInOut.OrderBy(a => a.TimeCheckIn).FirstOrDefault();
        //        var checkOut = checkInOut.OrderBy(a => a.TimeCheckIn).LastOrDefault();
        //        if (checkInOut != null)
        //        {
        //            return Ok(new
        //            {
        //                checkIn = checkIn != null ? checkIn.TimeCheckIn.ToString() : "not yet",
        //                checkOut = checkOut.TimeCheckOut != null ? checkOut.TimeCheckOut.ToString() : "not yet",
        //            });
        //        }
        //        else
        //        {
        //            return NotFound("Nhân viên chưa đăng ký vào hoặc ra");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest("Lỗi dữ liệu");
        //    }
        //}


        [Authorize(Roles = "TimeKeeping")]
        [HttpPost]
        public IActionResult AddCheckInOutForEmployee(int employeeId)
        {
            try
            {
                DateTime dateTime = DateTime.Now.Date;
                var Attendance = _context.CheckInOuts.Where(a => a.Date.Value.Date == dateTime.Date && a.EmployeeId == employeeId).AsQueryable();
                if (Attendance.Count() <= 0)
                {
                    var checkInOut = new CheckInOut()
                    {
                        EmployeeId = employeeId,
                        Date = dateTime,
                        TimeCheckIn = DateTime.Now.TimeOfDay,
                    };
                    _context.CheckInOuts.Add(checkInOut);
                }
                else
                {
                    var checkIn = Attendance.OrderBy(a => a.TimeCheckIn).LastOrDefault();
                    if (checkIn != null)
                    {
                        if (checkIn.TimeCheckOut == null)
                        {
                            checkIn.TimeCheckOut = DateTime.Now.TimeOfDay;
                            _context.CheckInOuts.Update(checkIn);
                        }
                        else
                        {
                            var checkInOut = new CheckInOut()
                            {
                                EmployeeId = employeeId,
                                Date = dateTime,
                                TimeCheckIn = DateTime.Now.TimeOfDay,
                            };
                            _context.CheckInOuts.Add(checkInOut);
                        }

                    }

                }
                _context.SaveChanges();
                return Ok("Đăng kí vào thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult UpdateCheckInOutForEmployee([FromBody] CheckInOutDTO checkInOutDTO)
        {
            try
            {
                if (checkInOutDTO.Id > 0)
                {
                    var checkInOut = _context.CheckInOuts.Where(a => a.CheckInOutId == checkInOutDTO.Id).FirstOrDefault();
                    
                    if (checkInOut != null)
                    {
                        
                        if(string.IsNullOrEmpty(checkInOutDTO.CheckOut) && string.IsNullOrEmpty(checkInOutDTO.CheckIn))
                        {
                            return BadRequest("Dữ liệu không thể chỉnh sửa");
                        }
                        checkInOut.TimeCheckOut = !string.IsNullOrEmpty(checkInOutDTO.CheckOut) && TimeSpan.TryParse(checkInOutDTO.CheckOut, out var checkOut) ? checkOut : checkInOut.TimeCheckOut;
                        checkInOut.TimeCheckIn = !string.IsNullOrEmpty(checkInOutDTO.CheckIn) && TimeSpan.TryParse(checkInOutDTO.CheckIn, out var checkIn) ? checkIn : checkInOut.TimeCheckIn;
                        if (checkInOut.TimeCheckIn > checkInOut.TimeCheckOut)
                        {
                            return BadRequest("Dữ liệu không thể chỉnh sửa");
                        }
                        var checKInOutDay = _context.CheckInOuts.Where(ce => ce.Date == checkInOut.Date && ce.CheckInOutId != checkInOutDTO.Id && (ce.TimeCheckIn.Value >= checkInOut.TimeCheckIn || ce.TimeCheckOut <= checkInOut.TimeCheckOut)).ToList();
                        if (checKInOutDay.Count() > 0)
                        {
                            return BadRequest("Dữ liệu không hợp lệ");
                        }
                        _context.CheckInOuts.Update(checkInOut);
                        _context.SaveChanges();
                        return Ok("success");
                    }
                    else
                    {
                        return StatusCode(403, "Không có thông tin đăng kí vào hoặc ra");
                    }
                }
                else
                {
                    return BadRequest("Không tìm thấy dữ liệu");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetDataCheckInOutByDateAndEmployeeId(int employeeId, string dateString)
        {
            try
            {
                if (!DateTime.TryParseExact(dateString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out var parsedDate))
                {
                    return BadRequest("Thông tin ngày không hợp lệ");
                }
                if (employeeId <= 0)
                {
                    return BadRequest("Nhân viên không hợp lệ");
                }
                var CheckInOut = await _context.CheckInOuts.Include(ci => ci.Employee).Where(ci => ci.EmployeeId == employeeId && ci.Date.Value.Date == parsedDate.Date)
                    .Select(ci => new
                    {
                        CheckInOutId = ci.CheckInOutId,
                        EmployeeId = employeeId,
                        Date = parsedDate,
                        TimeIn = ci.TimeCheckIn,
                        Timeout = ci.TimeCheckOut,
                        EmployeeName = ci.Employee.LastName + " " + ci.Employee.FirstName,
                    })
                    .ToListAsync();
                
                    var hourWork = _context.HoursWorkDays.Where(s => s.EmployeeId == employeeId && s.Day.Value.Date == parsedDate.Date).Sum(s => s.Hour);
                if(hourWork == null)
                {
                    hourWork = 0;
                }
                    int hours = (int)hourWork;
                    int minutes = (int)((hourWork - hours) * 60);
                    string formattedResult = $"{hours} giờ {minutes} phút";
                var result = new
                {
                    Hour = formattedResult,
                    CheckInOut = CheckInOut,
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public void AutoCheckinIfForgotCheckout(int employeeId)
        {
            DateTime currentDate = DateTime.Now.Date;
            DateTime previousDate = currentDate.AddDays(-1);


            var lastAttendance = _context.CheckInOuts
                .Where(a => a.EmployeeId == employeeId && a.Date == previousDate)
                .OrderByDescending(a => a.TimeCheckIn)
                .FirstOrDefault();

            if (lastAttendance != null && lastAttendance.TimeCheckOut == null)
            {
                var autoCheckin = new CheckInOut
                {
                    EmployeeId = employeeId,
                    TimeCheckIn = currentDate.TimeOfDay,
                    Date = currentDate
                };

                _context.CheckInOuts.Add(autoCheckin);
                _context.SaveChanges();
            }
        }

        [Authorize(Roles = "Home")]
        [HttpGet]
        public async Task<IActionResult> GetTimeKeepingInfo(int month, int year)
        {
            try
            {
                var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
                var employeeIdLength = maxEmployeeId.ToString().Length;

                var employees = await _context.Employees
                    .Include(e => e.HoursWorkDays) 
                    .Where(e => e.HoursWorkDays.Any())
                    .ToListAsync();

                var datesInMonth = Enumerable.Range(1, DateTime.DaysInMonth(year, month))
                    .Select(day => new DateTime(year, month, day))
                    .ToList();

                var timeKeepingData = employees.Select(employee => new
                {
                    EmployeeId = employee.EmployeeId,
                    EmployeeIdstring = employee.EmployeeId.ToString($"D{employeeIdLength}"),
                    EmployeeName = $"{employee.LastName}, {employee.FirstName}", 
                    TimeKeeping = datesInMonth.Select(date => new
                    {
                        Date = date.ToString("dd-MM"),
                        Status = employee.HoursWorkDays.Any(h => h.Day == date && h.Hour >= 6.5) ? "Yes" : "No"
                    }).ToList()
                }).ToList();

                return Ok(timeKeepingData);
            }
            catch (Exception ex)
            {
                return BadRequest("An error occurred while retrieving data.");
            }
        }
    }
}
