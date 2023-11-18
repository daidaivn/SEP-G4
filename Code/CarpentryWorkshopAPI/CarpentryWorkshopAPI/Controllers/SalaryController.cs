using CarpentryWorkshopAPI.IServices.ISalary;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class SalaryController : Controller
    {
        private readonly ISalaryService _salaryService;
        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [HttpGet]
        public IActionResult GetAllSalary(int month, int year)
        {
            try
            {
                var result = _salaryService.GetAllSalarys(month, year);
                if (result== null) 
                {
                    return BadRequest();
                }
                return Ok(result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
