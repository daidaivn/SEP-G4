using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class HolidayController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public HolidayController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllHolidays(int month, int year)
        {
            try
            {
                var allholidays = await _context.HolidaysDetails
                       .Include(x => x.Holiday)
                       .Where(x => x.Date.Value.Year == year && x.Date.Value.Month == month)
                       .GroupBy(x => x.Holiday.HolidayName)
                       .Select(group => new
                       {
                           HolidayDetailID = group.OrderBy(x => x.Date).First().HolidayDetailId,
                           HolidayID = group.First().Holiday.HolidayId,
                           HolidayName = group.Key,
                           Date = group.OrderBy(x => x.Date).First().Date.Value.ToString("dd'-'MM'-'yyyy"),
                           NumberOfHoliday = (int)(group.OrderByDescending(x => x.Date).First().Date.Value.Day - group.OrderBy(x => x.Date).First().Date.Value.Day) 
                       })
                       .ToListAsync();
                if (allholidays == null)
                {
                    return NotFound();
                }
                return Ok(allholidays);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetHolidays()
        {
            try
            {
                var holidays = await _context.Holidays
                    .Select(x => new 
                    {
                        HolidayID = x.HolidayId,
                        HolidayName = x.HolidayName,
                    })
                    .ToListAsync();
                if (holidays == null)
                {
                    return NotFound();
                }
                return Ok(holidays);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost] 
        public async Task<IActionResult> CreateAndUpdateHolidayDetail([FromBody] HolidayDetailDTO holidayDetailDTO)
        {
            try
            {
                if (holidayDetailDTO.HolidayDetailId == 0)
                {
                    var newHoliday = _mapper.Map<HolidaysDetail>(holidayDetailDTO);
                    if (newHoliday == null)
                    {
                        return BadRequest();
                    }
                    await _context.HolidaysDetails.AddAsync(newHoliday);
                    await _context.SaveChangesAsync();
                    return Ok("Create holiday detail successful");
                }
                else
                {
                    var updateHoliday = _mapper.Map<HolidaysDetail>(holidayDetailDTO);
                    if (updateHoliday == null)
                    {
                        return BadRequest();
                    }
                    _context.HolidaysDetails.Update(updateHoliday);
                    _context.SaveChanges();
                    return Ok("Update holiday detail successful");
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateAndUpdateHoliday([FromBody] HolidayDTO holidayDTO)
        {
            try
            {
                if (holidayDTO.HolidayId == 0)
                {
                    var newHoliday = _mapper.Map<Holiday>(holidayDTO);
                    if (newHoliday == null)
                    {
                        return BadRequest();
                    }
                    await _context.Holidays.AddAsync(newHoliday);
                    await _context.SaveChangesAsync();
                    return Ok("Create holiday successful");
                }
                else
                {
                    var updateHoliday = _mapper.Map<Holiday>(holidayDTO);
                    if (updateHoliday == null)
                    {
                        return BadRequest();
                    }
                    _context.Holidays.Update(updateHoliday);
                    _context.SaveChanges();
                    return Ok("Update holiday successful");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
