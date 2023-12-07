﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

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
                        NumberOfHoliday = (int)(group.OrderByDescending(x => x.Date).First().Date.Value.Day - group.OrderBy(x => x.Date).First().Date.Value.Day)
                    })
                    .ToList();
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
        public async Task<IActionResult> CreateHolidayDetail([FromBody] HolidayDetailDTO holidayDetailDTO)
        {
            try
            {            
                    var startDate = DateTime.ParseExact(holidayDetailDTO.StartDatestring, "dd/MM/yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                    var endDate = DateTime.ParseExact(holidayDetailDTO.EndDatestring, "dd/MM/yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
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
                   
                    return Ok("Create holiday detail successful");
               
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public async Task<IActionResult> UpdateHolidayDetail([FromBody] HolidayDTO holidayDTO)
        {
            try
            {
                var startDate = DateTime.ParseExact(holidayDTO.StartDatestring, "dd/MM/yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
                var endDate = DateTime.ParseExact(holidayDTO.EndDatestring, "dd/MM/yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
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
                return Ok("Update holiday detail successful");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
