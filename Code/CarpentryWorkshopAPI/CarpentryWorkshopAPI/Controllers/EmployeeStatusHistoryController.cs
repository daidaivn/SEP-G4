using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class EmployeeStatusHistoryController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public EmployeeStatusHistoryController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllEmployeeStatusHistory()
        {
            try
            {
                var historylist = _context.EmployeesStatusHistories
                    .Include(x => x.Employee)
                    .ToList();
                if (historylist == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<EmployeeHistoryDTO>>(historylist);
                return Ok(dto);
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
                   .Include(x => x.Employee)
                   .Where(x => x.ActionDate == employeeStatusHistoryDTO.ActionDate)
                   .ToList();
                    if (historylistbydate == null)
                    {
                        return NotFound();
                    }
                }
                var dto = _mapper.Map<List<EmployeeHistoryDTO>>(historylistbydate);
                return Ok(dto);
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
                        .Include(x => x.Employee)
                        .Where(x => x.ActionDate == employeeStatusHistoryDTO.ActionDate 
                        && x.EmployeeId == employeeStatusHistoryDTO.EmployeeId)
                        .ToList();
                    if (emphistorylistbydate == null)
                    {
                        return NotFound();
                    }
                }
                var dto = _mapper.Map<List<EmployeeHistoryDTO>>(emphistorylistbydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
