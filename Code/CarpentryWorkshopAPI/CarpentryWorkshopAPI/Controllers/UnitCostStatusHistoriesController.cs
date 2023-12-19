using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class UnitCostStatusHistoriesController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public UnitCostStatusHistoriesController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.UnitCostStatusHistories
                    .Include(x => x.UniCost)
                    .ToList();
                if (historys == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<UnitCostStatusHistoryDTO>>(historys);
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
                var historydate = _context.UnitCostStatusHistories
                    .Include(x => x.UniCost)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<UnitCostStatusHistoryDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetHistorys(string date, int uid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historydate = _context.UnitCostStatusHistories
                    .Include(x => x.UniCost)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.UniCostId == uid)
                    .ToList();
                if (historydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<UnitCostStatusHistoryDTO>>(historydate);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
