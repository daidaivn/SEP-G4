using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class DependentsStatusHistoriesController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;

        public DependentsStatusHistoriesController(SEPG4CWMSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDependentsStatusHistories()
        {
            try
            {
                var historylist = _context.DependentsStatusHistories.ToList();
                if (historylist == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(historylist);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                var historylistbydate = _context.DependentsStatusHistories
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
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet("{deid}/{actionDate}")]
        public IActionResult GetDependentsStatusHistoriesByDate(string actionDate, int deid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(actionDate, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var depehistorylistbydate = _context.DependentsStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate && x.DependentId == deid)
                    .ToList();
                if (depehistorylistbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(depehistorylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
