using CarpentryWorkshopAPI.DTO;
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
        [HttpPost]
        public IActionResult GetHistoryByDate([FromBody] EmployeeStatusHistoryDTO employeeStatusHistoryDTO)
        {
            try
            {
                List<EmployeesStatusHistory> historylistbydate = new List<EmployeesStatusHistory>();
                if (employeeStatusHistoryDTO.ActionDate.HasValue) {
                    historylistbydate = _context.EmployeesStatusHistories
                   .Where(x => x.ActionDate == employeeStatusHistoryDTO.ActionDate)
                   .ToList();
                    if (historylistbydate == null)
                    {
                        return NotFound();
                    }
                }
                return Ok(historylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetEmployeeStatusHistoryByDate([FromBody] EmployeeStatusHistoryDTO employeeStatusHistoryDTO)
        {
            try
            {
                List<EmployeesStatusHistory> emphistorylistbydate = new List<EmployeesStatusHistory>();
                if (employeeStatusHistoryDTO.ActionDate.HasValue && employeeStatusHistoryDTO.EmployeeId.HasValue)
                {
                         emphistorylistbydate = _context.EmployeesStatusHistories
                        .Where(x => x.ActionDate == employeeStatusHistoryDTO.ActionDate 
                        && x.EmployeeId == employeeStatusHistoryDTO.EmployeeId)
                        .ToList();
                    if (emphistorylistbydate == null)
                    {
                        return NotFound();
                    }
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
