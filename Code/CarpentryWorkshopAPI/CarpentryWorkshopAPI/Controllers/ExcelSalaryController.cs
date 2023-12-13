using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalary;
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
        [HttpGet("ContractsByDate/{month}/{year}/{employeeId}")]
        public async Task<ActionResult<IEnumerable<EmployeeInfo>>> GetEmployeesByContractDate(int month, int year, int employeeId)
        {
            var employees = await _excelSalarySevice.GetEmployeesByContractDateAsyncById(month, year, employeeId);

            return Ok(employees);
        }

        //[HttpPost("generate-excel/{month}/{year}")]
        //public async Task<IActionResult> GenerateExcel(int month, int year)
        //{
        //    var processedFile = await _excelSalarySevice.GenerateExcelAsync(month, year);
        //    return File(processedFile.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "generatedFile.xlsx");
        //}

        [HttpGet("export/{month}/{year}")]
        public async Task<IActionResult> ExportSalaryExcel(int month, int year)
        {
            try
            {
                var stream = await _excelSalarySevice.GenerateExcelAsync(month, year);
                string fileName = $"SalaryReport_{month}_{year}.xlsx";
                string fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                return File(stream, fileType, fileName);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Một lỗi được phát hiện trong tiến trình: " + ex.Message);
            }
        }

    }
}
