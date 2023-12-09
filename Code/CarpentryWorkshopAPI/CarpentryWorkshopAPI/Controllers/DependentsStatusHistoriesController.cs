﻿using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DependentsStatusHistoriesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;

        public DependentsStatusHistoriesController(SEPG4CCMSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDependentsStatusHistories()
        {
            try
            {
                var historylist = _context.DependentsStatusHistories.ToList();
                if (historylist == null)
                {
                    return NotFound();
                }
                return Ok(historylist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("actionDate")]
        public IActionResult GetHistoryByDate(string actionDate)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(actionDate, "dd-MM-yyyy",
                                      System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historylistbydate = _context.DependentsStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historylistbydate == null)
                {
                    return NotFound();
                }
                return Ok(historylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("{deid}/{actionDate}")]
        public IActionResult GetDependentsStatusHistoriesByDate(string actionDate, int deid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(actionDate, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var depehistorylistbydate = _context.DependentsStatusHistories
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate && x.DependentId == deid)
                    .ToList();
                if (depehistorylistbydate == null)
                {
                    return NotFound();
                }
                return Ok(depehistorylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
