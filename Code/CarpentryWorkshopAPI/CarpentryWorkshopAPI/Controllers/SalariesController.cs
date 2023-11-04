using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.Salary;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class SalariesController : ControllerBase
    {
        private readonly ISalaryService _salaryService;
        public SalariesController(ISalaryService salaryService)
        {
                _salaryService = salaryService;
        }
        [HttpGet]
        public IActionResult GetAllSalry()
        {
            try
            {
                var salary = _salaryService.GetAllSalary();
                if(salary == null)
                {
                    return NotFound();
                }
                return Ok(salary);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public IActionResult UpdateSalary([FromBody] CreateSalaryDTO createSalaryDTO) 
        {
            try
            {
                var update = _salaryService.UpdateSalary(createSalaryDTO);
                if(update == null)
                {
                    return NotFound();
                }
                return Ok(create);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult AddSalary([FromBody] CreateSalaryDTO createSalaryDTO)
        {
            try
            {
                var create = _salaryService.AddSalary(createSalaryDTO);
                if (create == null)
                {
                    return NotFound();
                }
                return Ok(create);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
