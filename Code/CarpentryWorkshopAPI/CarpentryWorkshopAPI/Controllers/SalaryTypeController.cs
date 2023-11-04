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
        public SalaryTypeController(ISalaryTypeService salaryTypeService)
        {
            _salaryTypeService = salaryTypeService;
           
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
        public dynamic CreateAndUpdateSalaryType([FromBody] SalaryTypeDTO salaryTypeDTO)
        {
            try
            {
                if (salaryTypeDTO.SalaryTypeId == 0)
                {
                    var result = _salaryTypeService.AddType(salaryTypeDTO);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    return Ok(result);
                }
                else
                {
                    var result = _salaryTypeService.UpdateType(salaryTypeDTO);
                    if (result == null)
                    {
                        return NotFound();
                    }
                    return Ok(result);
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public dynamic SearchTypes(string input)
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
    }
}
