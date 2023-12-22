using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IDay;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class HolidayController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        private readonly IDayService _dayService;
        public HolidayController(SEPG4CWMSContext context, IMapper mapper, IDayService dayService)
        {
            _context = context;
            _mapper = mapper;
            _dayService = dayService;
        }

        [HttpPost]
        public async Task<IActionResult> GetAllHolidays([FromBody] MonthYearDTO monthYearDTO)
        {
            try
            {
                var holidaysQuery = _context.HolidaysDetails
                        .Include(x => x.Holiday)
                        .ToList()
                        .AsQueryable();
                if (!string.IsNullOrEmpty(monthYearDTO.InputText))
                {
                    string input = monthYearDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                    holidaysQuery = holidaysQuery.Where(x => x.Holiday.HolidayName.ToLower().Normalize(NormalizationForm.FormD).Contains(input));
                }

                if (monthYearDTO.Year > 0)
                {
                    holidaysQuery = holidaysQuery.Where(x => x.Date.Value.Year == monthYearDTO.Year);
                }

                if (monthYearDTO.Month > 0)
                {
                    holidaysQuery = holidaysQuery.Where(x => x.Date.Value.Month == monthYearDTO.Month);
                }

                var allholidays = holidaysQuery
                    .GroupBy(x => x.Holiday.HolidayName)
                    .Select(group => new
                    {
                        HolidayDetailID = group.OrderBy(x => x.Date).First().HolidayDetailId,
                        HolidayID = group.First().Holiday.HolidayId,
                        HolidayName = group.Key,
                        Date = group.OrderBy(x => x.Date).First().Date.Value.ToString("dd'-'MM'-'yyyy"),
                        NumberOfHoliday = _dayService.CalculateNumberOfHolidays(group)
                    })
                    .ToList();
                if (allholidays == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(allholidays);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetHolidays(int holidayid)
        {
            try
            {
                var holidays = await _context.HolidaysDetails
                    .Include(x => x.Holiday)
                    .Where(x => x.HolidayId == holidayid)
                    .GroupBy(x => x.HolidayId)
                    .Select(group => new
                    {
                        HolidayDetailId = group.First().HolidayDetailId,
                        HolidayID = group.Key,
                        HolidayName = group.First().Holiday.HolidayName,
                        StartDate = group.Min(x => x.Date).Value.ToString("dd'-'MM'-'yyyy"),
                        EndDate = group.Max(x => x.Date).Value.ToString("dd'-'MM'-'yyyy"),
                        //Status = group.Min(x => x.Date).Value.Date > DateTime.Now.Date ? "HolidayNotStart"
                        //:(group.Min(x => x.Date).Value.Date <= DateTime.Now.Date && group.Max(x => x.Date).Value.Date > DateTime.Now.Date ? "HolidayStartButNotEnd"  
                        //:(group.Min(x => x.Date).Value.Date <= DateTime.Now.Date && group.Max(x => x.Date).Value.Date <= DateTime.Now.Date ? "HolidayEnd" : "HolidayStartButNotEnd"))
                        StartDateStatus = group.Min(x => x.Date).Value.Date <= DateTime.Now.Date ? true : false,
                        EndDateStatus = group.Max(x => x.Date).Value.Date <= DateTime.Now.Date ? true : false
                    })
                    .FirstOrDefaultAsync();
                if (holidays == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(holidays);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateHolidayDetail([FromBody] HolidayDetailDTO holidayDetailDTO)
        {
            try
            {
                var startDate = DateTime.ParseExact(holidayDetailDTO.StartDatestring, "dd-MM-yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
                var endDate = DateTime.ParseExact(holidayDetailDTO.EndDatestring, "dd-MM-yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
                if (startDate > endDate)
                {
                    return StatusCode(409, "Ngày bắt đầu không thể muộn hơn ngày kết thúc");
                }
                Holiday newHoliday = new Holiday()
                {
                    HolidayName = holidayDetailDTO.HolidayName
                };
                await _context.Holidays.AddAsync(newHoliday);
                await _context.SaveChangesAsync();
                while (startDate <= endDate)
                {
                    HolidaysDetail newHolidayDetail = new HolidaysDetail()
                    {
                        HolidayId = newHoliday.HolidayId,
                        Date = startDate,
                    };
                    await _context.HolidaysDetails.AddAsync(newHolidayDetail);
                    await _context.SaveChangesAsync();
                    startDate = startDate.AddDays(1);
                }

                return Ok("Tạo chi tiết ngày lễ thành công");

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateHolidayDetail([FromBody] HolidayDTO holidayDTO)
        {
            try
            {
                var startDate = DateTime.ParseExact(holidayDTO.StartDatestring, "dd-MM-yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
                var endDate = DateTime.ParseExact(holidayDTO.EndDatestring, "dd-MM-yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
                if (startDate > endDate)
                {
                    return StatusCode(409, "Ngày bắt đầu không thể muộn hơn ngày kết thúc");
                }
                var updateHoliday = await _context.Holidays.Where(x => x.HolidayId == holidayDTO.HolidayId).FirstOrDefaultAsync();
                updateHoliday.HolidayName = holidayDTO.HolidayName;
                _context.Holidays.Update(updateHoliday);
                var updateHolidayDetail = await _context.HolidaysDetails
                    .Where(x => x.HolidayId == holidayDTO.HolidayId)
                    .OrderBy(x => x.Date)
                    .ToListAsync();
                int index = 0;
                while (startDate <= endDate && index < updateHolidayDetail.Count)
                {
                    updateHolidayDetail[index].Date = startDate;
                    startDate = startDate.AddDays(1);
                    index++;
                }
                while (startDate <= endDate)
                {
                    var newHolidayDetail = new HolidaysDetail
                    {
                        HolidayId = holidayDTO.HolidayId,
                        Date = startDate,
                    };
                    updateHolidayDetail.Add(newHolidayDetail);
                    startDate = startDate.AddDays(1);
                }

                _context.HolidaysDetails.UpdateRange(updateHolidayDetail);
                await _context.SaveChangesAsync();
                return Ok("Chỉnh sửa chi tiết ngày lễ thành công");

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpDelete("{holidayId}")]
        public async Task<IActionResult> DeleteHolidayDetail(int holidayId)
        {
            try
            {
                if(holidayId <= 0)
                {
                    return BadRequest("Dữ liệu không hợp lệ");
                }
                var holiday = await _context.Holidays.FindAsync(holidayId);
                if (holiday != null)
                {
                    
                    var holidayDetail = await _context.HolidaysDetails.Where(e => e.HolidayId == holidayId && e.Date.Value.Date < DateTime.Now.Date).ToListAsync();
                    if(holidayDetail.Count() == 0)
                    {
                        var holidayDetailDelete = await _context.HolidaysDetails.Where(e => e.HolidayId == holidayId).ToListAsync();
                        _context.HolidaysDetails.RemoveRange(holidayDetailDelete);
                    }
                    else
                    {
                        return BadRequest("Ngày nghỉ không được phép xóa");
                    }
                    _context.Holidays.Remove(holiday);
                    _context.SaveChanges();
                    return Ok("Xóa thành công");
                }
                else
                {
                    return BadRequest("Không có dữ liệu");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        //[HttpPost]
        //public async Task<IActionResult> CreateAndUpdateHoliday([FromBody] HolidayDTO holidayDTO)
        //{
        //    try
        //    {
        //        if (holidayDTO.HolidayId == 0)
        //        {
        //            var newHoliday = _mapper.Map<Holiday>(holidayDTO);
        //            if (newHoliday == null)
        //            {
        //                return BadRequest();
        //            }
        //            await _context.Holidays.AddAsync(newHoliday);
        //            await _context.SaveChangesAsync();
        //            return Ok("Create holiday successful");
        //        }
        //        else
        //        {
        //            var updateHoliday = _mapper.Map<Holiday>(holidayDTO);
        //            if (updateHoliday == null)
        //            {
        //                return BadRequest();
        //            }
        //            _context.Holidays.Update(updateHoliday);
        //            _context.SaveChanges();
        //            return Ok("Update holiday successful");
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
