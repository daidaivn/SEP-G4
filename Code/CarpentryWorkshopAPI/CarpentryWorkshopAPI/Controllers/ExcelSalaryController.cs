﻿using AutoMapper;
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
        public async Task<ActionResult<IEnumerable<EmployeeInfo>>> GetEmployeesByContractDate( int month, int year)
        {
            var employees = await _excelSalarySevice.GetEmployeesByContractDateAsync(month, year);
            return Ok(employees);
        }

        [HttpPost("generate-excel/{month}/{year}")]
        public async Task<IActionResult> GenerateExcel(int month, int year)
        {
            var processedFile = await _excelSalarySevice.GenerateExcelAsync(month, year);
            return File(processedFile.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "generatedFile.xlsx");
        }
    }
}
