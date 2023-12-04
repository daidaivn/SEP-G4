using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalary;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class ExcelSalaryController : Controller
    {
        private readonly IExcelSalarySevice _excelSalarySevice;
        public ExcelSalaryController(IExcelSalarySevice excelSalarySevice)
        {
            _excelSalarySevice = excelSalarySevice;
        }



        [HttpGet("ContractsByDate/{month}/{year}")]
        public async Task<ActionResult<IEnumerable<EmployeeInfo>>> GetEmployeesByContractDate(int month, int year)
        {
            var employees = await _excelSalarySevice.GetEmployeesByContractDateAsync(month, year);
            return Ok(employees);
        }

        [HttpPost("export/{month}/{year}")]
        public async Task<IActionResult> ExportSalaryExcel(int month, int year)
        {
            var stream = await _excelSalarySevice.GenerateExcelAsync(month, year);
            string fileName = $"SalaryReport_{month}_{year}.xlsx";
            string fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            return File(stream, fileType, fileName);
        }

    }
}

