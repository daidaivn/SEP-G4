using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.Models;
using AutoMapper;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DegreesStatusHistoriesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;

        public DegreesStatusHistoriesController(SEPG4CCMSContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAllDegreesStatusHistories()
        {
            try
            {
                var historylist = _context.DegreesStatusHistories.ToList();
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
                DateTime date = DateTime.Parse(actionDate);
                var historylistbydate = _context.DegreesStatusHistories
                    .Where(x => x.ActionDate == date)
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
        [HttpGet("{did}/{actionDate}")]
        public IActionResult GetDegreesStatusHistoriesByDate(string actionDate, int did)
        {
            try
            {
                DateTime date = DateTime.Parse(actionDate);
                var dephistorylistbydate = _context.DegreesStatusHistories
                    .Where(x => x.ActionDate == date && x.DegreeId == did)
                    .ToList();
                if (dephistorylistbydate == null)
                {
                    return NotFound();
                }
                return Ok(dephistorylistbydate);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
