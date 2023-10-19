using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class TimeTrackingController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public TimeTrackingController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult CheckIn(bool checkin, int eid)
        {
            try
            {
                var employee = _context.Employees
                    .Include(x => x.Country)
                    .Include(emp => emp.RolesEmployees)
                    .FirstOrDefault(x => x.EmployeeId == eid);
                if (employee == null)
                {
                    return NotFound();
                }
                if (checkin ==  true) 
                {
                    TimeTracking newtt = new TimeTracking()
                    {
                        EmployeeId = employee.EmployeeId,
                        CheckIn = DateTime.Now,
                        CheckOut = null,
                        Note = null,
                    };
                    _context.TimeTrackings.Add(newtt);
                    _context.SaveChanges();
                    HistoryChangeTimeTracking history = new HistoryChangeTimeTracking()
                    {
                        TimeTrackingId = newtt.TimeTrackingId,
                        Action = "Check in",
                        ActionDate= DateTime.Now,
                        CurrentEmployeeId= null,
                    };
                    _context.HistoryChangeTimeTrackings.Add(history);
                }
               _context.SaveChanges();
                return Ok($"Check in for employee {employee.FirstName + " " + employee.LastName} successful ");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost]
        public IActionResult CheckOut(bool checkout, int eid, int ttid)
        {
            try
            {
                var employee = _context.Employees
                    .Include(x => x.Country)
                    .Include(emp => emp.RolesEmployees)
                    .FirstOrDefault(x => x.EmployeeId == eid);
                if (employee == null)
                {
                    return NotFound();
                }
                if (checkout == true)
                {
                    var tt = _context.TimeTrackings.FirstOrDefault(x => x.TimeTrackingId == ttid);
                    if (tt == null)
                    {
                        return NotFound();
                    }
                    _context.TimeTrackings.Update(tt);
                    HistoryChangeTimeTracking history = new HistoryChangeTimeTracking()
                    {
                        TimeTrackingId = tt.TimeTrackingId,
                        Action = "Check out",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeTimeTrackings.Add(history);
                }
                _context.SaveChanges();
                return Ok($"Check out for employee {employee.FirstName + " " + employee.LastName} successful ");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        //[HttpGet]
        //public IActionResult CalculateHourWork()
        //{

        //}
    }
}
