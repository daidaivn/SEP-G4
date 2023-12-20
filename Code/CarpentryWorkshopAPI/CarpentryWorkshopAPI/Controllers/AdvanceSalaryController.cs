using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IAdvance;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class AdvanceSalaryController : Controller
    {
        private readonly IAdvanceService _advanceService;
        private readonly SEPG4CWMSContext _context;
        public AdvanceSalaryController(IAdvanceService advanceService, SEPG4CWMSContext context)
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
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployees(string employeeidstring)
        {
            try
            {
                string trimmedEmployeeIdString = employeeidstring.TrimStart('0');
                int eid = Int32.Parse(trimmedEmployeeIdString);
                var existingAdvance = await _context.AdvancesSalaries
                    .Include(x => x.Employee)
                    .Where(x => x.Date.Value.Month == DateTime.Now.Month && x.Date.Value.Year == DateTime.Now.Year && x.EmployeeId == eid)
                    .ToListAsync();
                if (existingAdvance.Count > 0)
                {
                    return StatusCode(409, "Nhân viên đã tạm ứng trong tháng này");
                }
                var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                var endDate = startDate.AddMonths(1).AddDays(-1);
                var holidays = await _context.HolidaysDetails
                                     .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
                                     .Select(h => h.Date.Value)
                                     .ToListAsync();
                var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                var employees = await _context.Employees
                    .Include(x => x.HoursWorkDays)
                    .Where(x => x.EmployeeId == eid)
                    .FirstOrDefaultAsync();
                if (employees != null)
                {
                    var employeeWorkingDay = employees.HoursWorkDays
                        .Count(hwd => hwd.Day.HasValue &&
                                      TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
                                      !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));

                    if (employeeWorkingDay < 13)
                    {
                        return StatusCode(409, "Nhân viên này chưa đủ điều kiện được tạm ứng");
                    }
                }
                else
                {
                    return StatusCode(409, "Không tìm thấy nhân viên này");
                }
                var employee = await _advanceService.GetEmployee(employeeidstring);
                if (employee == null)
                {
                    return BadRequest("Không tìm thấy nhân viên này");
                }
                return Ok(employee);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
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
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(detail);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateAdvanceSalary([FromBody] CreateAdvanceDTO createAdvanceDTO)
        {
            try
            {
                //var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                //var endDate = startDate.AddMonths(1).AddDays(-1);
                //var holidays = await _context.HolidaysDetails
                //                     .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
                //                     .Select(h => h.Date.Value)
                //                     .ToListAsync();
                //var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                //var employee = await _context.Employees
                //    .Include(x => x.HoursWorkDays)
                //    .Where(x => x.EmployeeId == createAdvanceDTO.EmployeeId)
                //    .FirstOrDefaultAsync();
                //var employeeWorkingDay = employee.HoursWorkDays
                //    .Count(hwd => hwd.Day.HasValue &&
                //                  TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
                //                  !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));

                //if (employeeWorkingDay < 13)
                //{
                //    return StatusCode(409, "Nhân viên này chưa đủ điều kiện được tạm ứng");
                //}
                var newAd = await _advanceService.CreateAdvance(createAdvanceDTO);
                if (newAd == null)
                {
                    return StatusCode(500, "Lỗi máy chủ");
                }
                return Ok(newAd);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateAdvanceSalary([FromBody] UpdateAdvanceDTO updateAdvanceDTO)
        {
            try
            {
                //var startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                //var endDate = startDate.AddMonths(1).AddDays(-1);
                //var holidays = await _context.HolidaysDetails
                //                     .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
                //                     .Select(h => h.Date.Value)
                //                     .ToListAsync();
                //var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
                //var employee = await _context.Employees
                //    .Include(x => x.HoursWorkDays)
                //    .Where(x => x.EmployeeId == updateAdvanceDTO.EmployeeId)
                //    .FirstOrDefaultAsync();
                //var employeeWorkingDay = employee.HoursWorkDays
                //    .Count(hwd => hwd.Day.HasValue &&
                //                  TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
                //                  !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));

                //if (employeeWorkingDay < 13)
                //{
                //    return StatusCode(409, "Nhân viên này chưa đủ điều kiện được tạm ứng");
                //}
                var updateAd = await _advanceService.UpdateAdvance(updateAdvanceDTO);
                if (updateAd == null)
                {
                    return StatusCode(500, "Lỗi máy chủ");
                }
                return Ok(updateAd);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }
        }
        [HttpDelete("{Aid}")]
        public async Task<IActionResult> UpdateAdvanceSalary(int Aid)
        {
            try
            {              
                var updateAd = await _advanceService.DeleteAdvance(Aid);
                if (updateAd == null)
                {
                    return StatusCode(500, "Lỗi máy chủ");
                }
                return Ok(updateAd);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }
        }
    }
}
