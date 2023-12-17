using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DepartmentsStatusHistoriesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;

        public DepartmentsStatusHistoriesController(SEPG4CCMSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDepartmentsStatusHistories()
        {
            try
            {
                var historylist = _context.DepartmentsStatusHistories.ToList();
                if (historylist == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(historylist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }

        }
        [HttpGet("actionDate")]
        public IActionResult GetHistoryByDate(string actionDate)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(actionDate, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historylistbydate = _context.DepartmentsStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historylistbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(historylistbydate);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpGet("{did}/{actionDate}")]
        public IActionResult GetDepartmentsStatusHistoryByDate(string actionDate, int did)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(actionDate, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var dephistorylistbydate = _context.DepartmentsStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.DepartmentId == did)
                    .ToList();
                if (dephistorylistbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(dephistorylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
