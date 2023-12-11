using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DegreesStatusHistoriesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;

        public DegreesStatusHistoriesController(SEPG4CCMSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDegreesStatusHistories()
        {
            try
            {
                var historylist = _context.DegreesStatusHistories.ToList();
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
                var historylistbydate = _context.DegreesStatusHistories
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
        [HttpGet("{did}/{actionDate}")]
        public IActionResult GetDegreesStatusHistoriesByDate(string actionDate, int did)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(actionDate, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var dephistorylistbydate = _context.DegreesStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.DegreeId == did)
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
