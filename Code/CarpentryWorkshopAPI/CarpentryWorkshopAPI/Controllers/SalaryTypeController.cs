using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalaryType;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class SalaryTypeController : Controller
    {
        private readonly ISalaryTypeService _salaryTypeService;
        private readonly IMapper _mapper;
        private readonly SEPG4CCMSContext _context;
        public SalaryTypeController(ISalaryTypeService salaryTypeService, IMapper mapper, SEPG4CCMSContext context)
        {
            _salaryTypeService = salaryTypeService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet]
        public dynamic GetAllTypes()
        {
            try
            {
                var result = _salaryTypeService.GetAllSalaryType();
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult CreateAndUpdateSalaryType([FromBody] SalaryTypeDTO salaryTypeDTO)
        {
            try
            {
                if (salaryTypeDTO.SalaryTypeId == 0)
                {
                    var result = _mapper.Map<SalaryType>(salaryTypeDTO);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    _context.SalaryTypes.Add(result);
                    _context.SaveChanges();
                    return Ok("Create salary type successful");
                }
                else
                {
                    var result = _mapper.Map<SalaryType>(salaryTypeDTO);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    _context.SalaryTypes.Update(result);
                    _context.SaveChanges();
                    return Ok("Update salary type successful");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult SearchTypes(string input)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(input))
                {
                    return BadRequest("Seach input is empty");
                }
                var result = _salaryTypeService.SearchSalaryTypes(input);
                if (result == null)
                {
                    return NotFound();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public dynamic AddType(SalaryTypeDTO salaryType)
        {
            try
            {
                var input = _salaryTypeService.AddType(salaryType);
                return Ok(input);
            }
            catch (Exception ex) { return ex.Message; }
        }
    }
}
