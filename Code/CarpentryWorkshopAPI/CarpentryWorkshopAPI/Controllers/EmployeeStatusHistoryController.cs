using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class EmployeeStatusHistoryController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        public EmployeeStatusHistoryController(SEPG4CCMSContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetAllEmployeeStatusHistory()
        {
            try
            {
                var historylist = _context.EmployeesStatusHistories.ToList();
                if (historylist == null)
                {
                    return NotFound();
                }
                return Ok(historylist);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpGet("actionDate")]
        public IActionResult GetHistoryByDate(string actionDate)
        {
            try
            {
                DateTime date= DateTime.Parse(actionDate);
                var historylistbydate = _context.EmployeesStatusHistories
                    .Where(x => x.ActionDate == date)
                    .ToList();
                if (historylistbydate == null)
                {
                    return NotFound();
                }
                return Ok(historylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{eid}/{actionDate}")]
        public IActionResult GetEmployeeStatusHistoryByDate(string actionDate, int eid)
        {
            try
            {
                DateTime date = DateTime.Parse(actionDate);
                var emphistorylistbydate = _context.EmployeesStatusHistories
                    .Where(x => x.ActionDate == date && x.EmployeeId == eid)
                    .ToList();
                if (emphistorylistbydate == null)
                {
                    return NotFound();
                }
                return Ok(emphistorylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
