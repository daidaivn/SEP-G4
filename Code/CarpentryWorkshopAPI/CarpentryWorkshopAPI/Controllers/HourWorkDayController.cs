using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HourWorkDayController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;

        public HourWorkDayController(SEPG4CWMSContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult GetHourWorkDayDetail(int employeeId, string dateString)
        {
            try
            {
                if (!DateTime.TryParseExact(dateString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out var parsedDate))
                {
                    return BadRequest("Thông tin ngày không hợp lệ");
                }
                if (employeeId <= 0)
                {
                    return BadRequest("Nhân viên không hợp lệ");
                }
                var hourWork = _context.HoursWorkDays.Where(s=>s.EmployeeId == employeeId && s.Day.Value.Date == parsedDate.Date).Sum(s=>s.Hour);
                if(hourWork < 0)
                {
                    return BadRequest("Dữ liệu không hợp lệ");
                }
                if(hourWork == null) 
                {
                    return Ok(0);
                }
                int hours = (int)hourWork;
                int minutes = (int)((hourWork - hours) * 60);
                string formattedResult = $"{hours} giờ {minutes} phút";

                return Ok(formattedResult);

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
