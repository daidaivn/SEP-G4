using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class CountryController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public CountryController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllCountry()
        {
            try
            {
                var countrys = _context.Countries.Select(c => new
                {
                    CountryId = c.CountryId,
                    CountryName = c.CountryName,
                });
                if (countrys == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(countrys);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
    }
}
