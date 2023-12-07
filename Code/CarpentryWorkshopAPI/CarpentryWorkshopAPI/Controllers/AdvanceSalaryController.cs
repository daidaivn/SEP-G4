using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IAdvance;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class AdvanceSalaryController : Controller
    {
        private readonly IAdvanceService _advanceService;
        private readonly SEPG4CCMSContext _context;
        public AdvanceSalaryController(IAdvanceService advanceService, SEPG4CCMSContext context)
        {
            _advanceService = advanceService;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> GetAllAdvanceSalarys([FromBody] SearchAdvanceDTO searchAdvanceDTO)
        {
            try
            {
                var advances = await _advanceService.GetAllAdvanceSalary(searchAdvanceDTO);
                if (advances == null)
                {
                    return NotFound();
                }
                return Ok(advances);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployees(string employeeidstring)
        {
            try
            {
                var employee = await _advanceService.GetEmployee(employeeidstring);
                if (employee == null)
                {
                    return NotFound();
                }
                return Ok(employee);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAdvanceSalaryDetail(int advanceSalaryId)
        {
            try
            {
                var detail = await _advanceService.GetAdvanceDetail(advanceSalaryId);
                if (detail == null)
                {
                    return NotFound();
                }
                return Ok(detail);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateAdvanceSalary([FromBody] CreateAdvanceDTO createAdvanceDTO)
        {
            try
            {
                var startDate = new DateTime(createAdvanceDTO.my.Year, createAdvanceDTO.my.Month, 1);
                var endDate = startDate.AddMonths(1).AddDays(-1);
                var holidays = await _context.HolidaysDetails
                                     .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
                                     .Select(h => h.Date.Value)
                                     .ToListAsync();
                var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                var employee = await _context.Employees
                    .Include(x => x.HoursWorkDays)
                    .Where(x => x.EmployeeId == createAdvanceDTO.EmployeeId)
                    .FirstOrDefaultAsync();
                var employeeWorkingDay = employee.HoursWorkDays
                    .Count(hwd => hwd.Day.HasValue &&
                                  TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
                                  !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));

                if (employeeWorkingDay < 13)
                {
                    return StatusCode(409, "Nhân viên này chưa đủ điều kiện được tạm ứng");
                }
                var newAd = await _advanceService.CreateAdvance(createAdvanceDTO);
                if (newAd == null)
                {
                    return BadRequest();
                }
                return Ok(newAd);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateAdvanceSalary([FromBody] CreateAdvanceDTO createAdvanceDTO)
        {
            try
            {
                var startDate = new DateTime(createAdvanceDTO.my.Year, createAdvanceDTO.my.Month, 1);
                var endDate = startDate.AddMonths(1).AddDays(-1);
                var holidays = await _context.HolidaysDetails
                                     .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
                                     .Select(h => h.Date.Value)
                                     .ToListAsync();
                var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                var employee = await _context.Employees
                    .Include(x => x.HoursWorkDays)
                    .Where(x => x.EmployeeId == createAdvanceDTO.EmployeeId)
                    .FirstOrDefaultAsync();
                var employeeWorkingDay = employee.HoursWorkDays
                    .Count(hwd => hwd.Day.HasValue &&
                                  TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
                                  !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));

                if (employeeWorkingDay < 13)
                {
                    return StatusCode(409, "Nhân viên này chưa đủ điều kiện được tạm ứng");
                }
                var updateAd = await _advanceService.UpdateAdvance(createAdvanceDTO);
                if (updateAd == null)
                {
                    return BadRequest();
                }
                return Ok(updateAd);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
