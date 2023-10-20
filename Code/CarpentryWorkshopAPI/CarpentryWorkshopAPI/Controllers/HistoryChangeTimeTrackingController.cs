using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class HistoryChangeTimeTrackingController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public HistoryChangeTimeTrackingController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.HistoryChangeTimeTrackings
                    .Include(x => x.TimeTracking)
                    .ToList();
                if (historys == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<HistoryChangeTimeTrackingDTO>>(historys);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetHistorysByDate(string date)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historydate = _context.HistoryChangeTimeTrackings
                    .Include(x => x.TimeTracking)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<HistoryChangeTimeTrackingDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetHistorys(string date, int ttid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historydate = _context.HistoryChangeTimeTrackings
                    .Include(x => x.TimeTracking)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.TimeTrackingId == ttid)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<HistoryChangeTimeTrackingDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
