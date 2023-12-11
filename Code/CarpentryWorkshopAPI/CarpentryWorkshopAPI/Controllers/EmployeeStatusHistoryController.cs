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
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<EmployeeHistoryDTO>>(historylist);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }

        }
        [HttpPost]
        public IActionResult GetHistoryByDate(string date)
        {
            try
            {


                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historylistbydate = _context.EmployeesStatusHistories
                .Include(x => x.Employee)
                .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                .ToList();
                if (historylistbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }

                var dto = _mapper.Map<List<EmployeeHistoryDTO>>(historylistbydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult GetEmployeeStatusHistoryByDate(string date, int eid)
        {
            try
            {


                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var emphistorylistbydate = _context.EmployeesStatusHistories
                     .Include(x => x.Employee)
                     .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                     && x.EmployeeId == eid)
                     .ToList();
                if (emphistorylistbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }

                var dto = _mapper.Map<List<EmployeeHistoryDTO>>(emphistorylistbydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
