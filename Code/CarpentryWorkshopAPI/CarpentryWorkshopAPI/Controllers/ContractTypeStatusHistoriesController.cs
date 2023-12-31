﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class ContractTypeStatusHistoriesController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public ContractTypeStatusHistoriesController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllHistories()
        {
            try
            {
                var histories = _context.ContractTypeStatusHistories
                    .Include(x => x.ContractType)
                    .ToList();
                if (histories == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<ContractTypeHistoryDTO>>(histories);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpPost]
        public IActionResult GetHistories(string date, int ctid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var cth = _context.ContractTypeStatusHistories
                        .Include(x => x.ContractType)
                        .Where(x => x.ContractTypeId == ctid &&
                        x.ActionDate >= startDate && x.ActionDate <= endDate)
                        .ToList();
                if (cth == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }


                var dto = _mapper.Map<List<ContractTypeHistoryDTO>>(cth);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpPost]
        public IActionResult GetHistoriesByDate(string date)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var cth = _context.ContractTypeStatusHistories
                 .Include(x => x.ContractType)
                 .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                 .ToList();
                if (cth == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }


                var dto = _mapper.Map<List<ContractTypeHistoryDTO>>(cth);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
    }
}
