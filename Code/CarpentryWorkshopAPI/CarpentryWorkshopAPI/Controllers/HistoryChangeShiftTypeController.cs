using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class HistoryChangeShiftTypeController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public HistoryChangeShiftTypeController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.HistoryChangeShiftTypes
                    .Include(x => x.ShiftType)
                    .ToList();
                if (historys == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<HistoryChangeShiftTypeDTO>>(historys);
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
                var historydate = _context.HistoryChangeShiftTypes
                    .Include(x => x.ShiftType)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<HistoryChangeShiftTypeDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetHistorys(string date, int sid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historydate = _context.HistoryChangeShiftTypes
                    .Include(x => x.ShiftType)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.ShiftTypeId == sid
                    )
                    .ToList();
                if (historydate == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<HistoryChangeShiftTypeDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
