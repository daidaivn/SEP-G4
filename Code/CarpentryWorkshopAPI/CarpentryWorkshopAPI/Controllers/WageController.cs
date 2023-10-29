using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class WageController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public WageController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllWage()
        {
            try
            {
                var wages = _context.Wages.ToList();
                if (wages == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<WageDTO>(wages);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult CreateAndUpdateWage([FromBody] CreateWageDTO createWageDTO)
        {
            try
            {
                if (createWageDTO.WageId == 0)
                {
                    var newwage = _mapper.Map<Wage>(createWageDTO);
                    if (newwage == null)
                    {
                        return BadRequest();
                    }
                    _context.Wages.Add(newwage);
                    _context.SaveChanges();
                    return Ok("Create wage successful");
                }
                else
                {
                    var updatewage = _mapper.Map<Wage>(createWageDTO);
                    if (updatewage == null)
                    {
                        return BadRequest();
                    }
                    _context.Wages.Update(updatewage);
                    _context.SaveChanges();
                    return Ok("Update wage successful");
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult ChangeStatus(int wgid)
        {
            try
            {
                var wage = _context.Wages.FirstOrDefault(x => x.WageId == wgid);
                if (wage == null)
                {
                    return NotFound();
                }
                if (wage.Status == true)
                {
                    wage.Status = false;
                }
                else
                {
                    wage.Status = true;
                }
                _context.SaveChanges();
                return Ok("Change wage status successful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
