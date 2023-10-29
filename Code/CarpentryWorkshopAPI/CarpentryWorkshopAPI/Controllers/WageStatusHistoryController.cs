using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class WageStatusHistoryController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public WageStatusHistoryController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.WageStatusHistories
                    .ToList();
                if (historys == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<WageStatusHistoryDTO>>(historys);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetHistorysByDate(string date)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.WageStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound();
                }
                var historydateDTO = _mapper.Map<List<WageStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetHistorys(string date, int wgid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.WageStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.WageId== wgid)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound();
                }
                var historydateDTO = _mapper.Map<List<WageStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
