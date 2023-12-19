using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class WorkScheduleStatusHistoryController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public WorkScheduleStatusHistoryController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.WorkScheduleStatusHistories
                    .Include(x => x.WorkSchedule)
                    .ToList();
                if (historys == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<WorkScheduleHistoryDTO>>(historys);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                var historydate = _context.WorkScheduleStatusHistories
                    .Include(x => x.WorkSchedule)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<WorkScheduleHistoryDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetHistorys(string date, int wid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historydate = _context.WorkScheduleStatusHistories
                    .Include(x => x.WorkSchedule)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.WorkScheduleId == wid)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<WorkScheduleHistoryDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
