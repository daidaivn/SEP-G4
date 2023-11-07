using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class CountryController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public CountryController(SEPG4CCMSContext context, IMapper mapper)
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
                    CountryId= c.CountryId,
                    CountryName= c.CountryName,
                });
                if (countrys == null)
                {
                    return NotFound();
                }
                return Ok(countrys);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
