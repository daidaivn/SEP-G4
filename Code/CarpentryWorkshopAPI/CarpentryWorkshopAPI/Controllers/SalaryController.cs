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
        public dynamic GetAllSalary(int month, int year)
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
        [HttpGet]
        public dynamic GetEmployeeSalary(int employeeid, int month, int year)
        {
            try
            {
                var result = _salaryService.GetEmployeeSalaryDetail(employeeid, month, year);
                if (result==null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public dynamic GetEmployeeAllowanceDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = _salaryService.GetEmployeeAllowanceDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public dynamic GetEmployeeMainSalaryDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = _salaryService.GetEmployeeMainSalaryDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public dynamic GetEmployeeDeductionDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = _salaryService.GetEmployeeDeductionDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public dynamic GetEmployeeActualSalaryDetail(int employeeid, int month, int year)
        {
            try
            {
                var result = _salaryService.GetEmployeeActualSalryDetail(employeeid, month, year);
                if (result == null)
                {
                    return BadRequest();
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
