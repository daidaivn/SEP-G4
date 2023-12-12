using CarpentryWorkshopAPI.DTO;
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

        [HttpPost]
        public async Task<IActionResult> GetAllSalary([FromBody] GetSalarysDTO getSalarysDTO)
        {
            try
            {
                var result = await _salaryService.GetAllSalarys(getSalarysDTO);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeSalary(int employeeid, int month, int year)
        {
            try
            {
                var result = await _salaryService.GetEmployeeSalaryDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeAllowanceDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = await _salaryService.GetEmployeeAllowanceDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeMainSalaryDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = await _salaryService.GetEmployeeMainSalaryDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeDeductionDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = await _salaryService.GetEmployeeDeductionDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeActualSalaryDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = await _salaryService.GetEmployeeActualSalaryDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }

    }
}
