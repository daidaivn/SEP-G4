﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    [Authorize(Roles = "TimeKeeping")]
    public class CheckInOutController : ControllerBase
    {

        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;
        public CheckInOutController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllCheckInOut()
        {
            try
            {
                var allchecks = _context.CheckInOuts
                    .Include(x => x.Employee)
                    .ToList();
                if (allchecks == null)
                {
                    return NotFound();
                }
                return Ok(allchecks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("api/attendance/{employeeId}")]
        public IActionResult GetAttendanceStatus(int employeeId)
        {
            DateTime currentDate = DateTime.Now.Date;

            var lastAttendance = _context.CheckInOuts
                .Where(a => a.EmployeeId == employeeId && a.Date == currentDate)
                .OrderByDescending(a => a.TimeCheckIn)
                .FirstOrDefault();
            var team = _context.EmployeeTeams.Where(et => et.EmployeeId == employeeId && et.EndDate == null)
                .Include(et => et.Team).ThenInclude(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Select(et => new
                {
                    TimeIn = et.Team.WorkSchedules.Select(ws => ws.ShiftType.StartTime).Single(),
                    Timeout = et.Team.WorkSchedules.Select(ws => ws.ShiftType.EndTime).Single(),
                });
            if (lastAttendance == null)
            {
                if (DateTime.Now.TimeOfDay > team.Select(t => t.TimeIn.Value).Single())
                {
                    return Ok("Vắng mặt");
                }
                // Trường hợp người dùng chưa check-in
                return Ok("Chưa có mặt");
            }
            else
            {
                if (lastAttendance.TimeCheckOut == null)
                {
                    if (DateTime.Now.TimeOfDay > team.Select(t => t.Timeout.Value).Single())
                    {
                        return Ok("Vắng mặt");
                    }
                    return Ok("Có mặt");
                }
                else
                {
                    return Ok("Nhân viên đã check out");
                }
            }

        }

        [HttpGet("GetEmployeesByTeamLeaderId/{teamLeaderId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetEmployeesByTeamLeaderIdOrTeamSubLeaderId(int teamLeaderId)
        {

            var teamId = await _context.Teams
                .Where(t => t.TeamLeaderId == teamLeaderId || t.TeamSubLeaderId == teamLeaderId)
                .Include(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Include(et => et.Works).Select(et => new
                {
                    TimeIn = et.WorkSchedules.Select(ws => ws.ShiftType.StartTime).Single(),
                    Timeout = et.WorkSchedules.Select(ws => ws.ShiftType.EndTime).Single(),
                    TeamId = et.TeamId,
                    WorkId = et.Works.Select(w => w.WorkId)
                })
                .FirstOrDefaultAsync();

            if (teamId.TeamId == 0)
            {
                return NotFound("Team Leader not found");
            }

            var employees = await _context.EmployeeTeams
                .Where(et => et.TeamId == teamId.TeamId && et.EndDate == null)
                .Select(et => et.Employee)
                .ToListAsync();
            if (employees.Count == 0)
            {
                return NotFound("No employees found in the team with EndDate == null");
            }

            var result = new List<object>();
            result.Add(new
            {
                TimeIn = teamId.TimeIn,
                Timeout = teamId.Timeout,
            });
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
                        Name = employee.FirstName + " " + employee.LastName,
                        Status = 4, //Chưa có công việc
                        CheckStatus = "CheckIn",
                        TimeIn = "",
                        TimeOut = ""
                    });
                }
                else if (checkInTime == null)
                {
                    if (DateTime.Now.TimeOfDay > teamId.TimeIn)
                    {
                        result.Add(new
                        {
                            EmployeeId = employee.EmployeeId,
                            Name = employee.FirstName + " " + employee.LastName,
                            Status = 3, //Vắng mặt
                            CheckStatus = "CheckIn",
                            TimeIn = "",
                            TimeOut = ""
                        });
                    }
                    else
                    {
                        result.Add(new
                        {
                            EmployeeId = employee.EmployeeId,
                            Name = employee.FirstName + " " + employee.LastName,
                            Status = 1, //Checkin
                            CheckStatus = "CheckIn",
                            TimeIn = "",
                            TimeOut = ""
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
                            Name = employee.FirstName + " " + employee.LastName,
                            Status = 6,//tan ca
                            CheckStatus = "EndCheck",
                            TimeIn = latestCheckOutTime.TimeCheckIn,
                            TimeOut = teamId.Timeout
                        });
                    }
                    else if (latestCheckOutTime.TimeCheckOut == null)
                    {
                        result.Add(new
                        {
                            EmployeeId = employee.EmployeeId,
                            Name = employee.FirstName + " " + employee.LastName,
                            Status = 2,//Checkout
                            CheckStatus = "CheckOut",
                            TimeIn = latestCheckOutTime.TimeCheckIn,
                            TimeOut = ""
                        });
                    }
                    else
                    {

                        result.Add(new
                        {
                            EmployeeId = employee.EmployeeId,
                            Name = employee.FirstName + " " + employee.LastName,
                            Status = 5,//tam vang
                            CheckStatus = "CheckIn",
                            TimeIn = latestCheckOutTime.TimeCheckIn,
                            TimeOut = latestCheckOutTime.TimeCheckOut
                        });
                    }

                }

            }
            return result;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetAllEmployeesCheckInOut()
        {
            var result = new List<object>();
            foreach (var Id in _context.Teams.Select(t => t.TeamId).ToList())
            {
                var teamId = await _context.Teams
                .Where(t => t.TeamId == Id)
                .Include(et => et.WorkSchedules).ThenInclude(et => et.ShiftType).Include(et => et.Works).Select(et => new
                {
                    TimeIn = et.WorkSchedules.Select(ws => ws.ShiftType.StartTime).Single(),
                    Timeout = et.WorkSchedules.Select(ws => ws.ShiftType.EndTime).Single(),
                    TeamId = et.TeamId,
                    WorkId = et.Works.Select(w => w.WorkId)
                })
                .FirstOrDefaultAsync();

                if (teamId.TeamId == 0)
                {
                    return NotFound("Team Leader not found");
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
                            Name = employee.FirstName + " " + employee.LastName,
                            Status = 4,
                            CheckStatus = "CheckIn",
                            TimeIn = "",
                            TimeOut = ""
                        });
                    }
                    else if (checkInTime == null)
                    {
                        if (DateTime.Now.TimeOfDay > teamId.TimeIn)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.FirstName + " " + employee.LastName,
                                Status = 3,
                                CheckStatus = "CheckIn",
                                TimeIn = "",
                                TimeOut = ""
                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.FirstName + " " + employee.LastName,
                                Status = 1,
                                CheckStatus = "CheckIn",
                                TimeIn = "",
                                TimeOut = ""
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
                                Name = employee.FirstName + " " + employee.LastName,
                                Status = 6,//tan ca
                                CheckStatus = "EndCheck",
                                TimeIn = checkInTime,
                                TimeOut = teamId.Timeout
                            });
                        }
                        else if (latestCheckOutTime == null)
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.FirstName + " " + employee.LastName,
                                Status = 2,//Checkout
                                CheckStatus = "CheckOut",
                                TimeIn = checkInTime,
                                TimeOut = teamId.Timeout
                            });
                        }
                        else
                        {
                            result.Add(new
                            {
                                EmployeeId = employee.EmployeeId,
                                Name = employee.FirstName + " " + employee.LastName,
                                Status = 5,//tam vang
                                CheckStatus = "CheckIn",
                                TimeIn = checkInTime,
                                TimeOut = teamId.Timeout
                            });
                        }

                    }

                }
            }
            return result;
        }
        [HttpGet("{employeeId}/{date}")]
        public IActionResult GetCheckInOutForEmoployeeId(int employeeId, string date)
        {
            try
            {
                DateTime datetime = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                var checkInOut = _context.CheckInOuts.Where(a => a.Date.Value.Date == datetime && a.EmployeeId == employeeId).AsQueryable();
                var checkIn = checkInOut.OrderBy(a => a.TimeCheckIn).FirstOrDefault();
                var checkOut = checkInOut.OrderBy(a => a.TimeCheckIn).LastOrDefault();
                if (checkInOut != null)
                {
                    return Ok(new
                    {
                        checkIn = checkIn != null ? checkIn.TimeCheckIn.ToString() : "not yet",
                        checkOut = checkOut.TimeCheckOut != null ? checkOut.TimeCheckOut.ToString() : "not yet",
                    });
                }
                else
                {
                    return NotFound("emoployee chua checkin or out");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
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
                return Ok("Check In Out success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public IActionResult UpdateCheckInOutForEmployee([FromBody] CheckInOutDTO checkInOutDTO)
        {
            try
            {
                DateTime date = DateTime.ParseExact(checkInOutDTO.DateForCheckString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                if (checkInOutDTO.DateForCheckString != null && checkInOutDTO.employeeId > 0)
                {
                    var checkInOut = _context.CheckInOuts.Where(a => a.Date.Value.Date == date.Date && a.EmployeeId == checkInOutDTO.employeeId).AsQueryable();
                    if (checkInOut != null)
                    {
                        var checkIn = checkInOut.OrderBy(a => a.TimeCheckIn).FirstOrDefault();
                        var checkOut = checkInOut.OrderByDescending(a => a.TimeCheckIn).FirstOrDefault();
                        if (checkIn != null && checkInOutDTO.CheckIn != null)
                        {
                            checkIn.TimeCheckIn = checkInOutDTO.CheckIn.Value;
                            _context.CheckInOuts.Update(checkIn);
                        }
                        if (checkOut != null && checkInOutDTO.CheckOut != null)
                        {
                            checkOut.TimeCheckOut = checkInOutDTO.CheckOut.Value;
                            _context.CheckInOuts.Update(checkOut);
                        }
                        _context.SaveChanges();
                        return Ok("Update success");
                    }
                    else
                    {

                        var check = new CheckInOut()
                        {
                            EmployeeId = checkInOutDTO.employeeId,
                            Date = date,
                            TimeCheckIn = checkInOutDTO.CheckIn,
                            TimeCheckOut = checkInOutDTO.CheckOut,
                        };
                        _context.CheckInOuts.Add(check);
                        return Ok("Update success");
                    }
                }
                else
                {
                    return BadRequest("missing data");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                // Tự động thêm "check-in" cho ngày hôm nay
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
    }
}
