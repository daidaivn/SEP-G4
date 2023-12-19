using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class RoleStatusHistoryController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public RoleStatusHistoryController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.RolesStatusHistories
                    .Include(x => x.Role)
                    .ToList();
                if (historys == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var rshDTO = _mapper.Map<List<RoleStatusHistoryDTO>>(historys);
                return Ok(rshDTO);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult GetRoleHistoryByDate(string date)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.RolesStatusHistories
                    .Include(x => x.Role)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var historydateDTO = _mapper.Map<List<RoleStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult GetRoleHistorys(string date, int rid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.RolesStatusHistories
                    .Include(x => x.Role)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.RoleId == rid)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var historydateDTO = _mapper.Map<List<RoleStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
