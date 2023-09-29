using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class RoleStatusHistoryController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public RoleStatusHistoryController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.RolesStatusHistories.ToList();
                if (historys == null)
                {
                    return NotFound();
                }
                var rshDTO = _mapper.Map<List<RoleStatusHistoryDTO>>(historys);
                return Ok(rshDTO);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet]
        //public IActionResult GetRpleHistoryByName(int id) { }
    }
}
