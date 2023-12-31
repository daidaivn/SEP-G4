﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class ContractStatusHistoriesController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public ContractStatusHistoriesController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.ContractsStatusHistories
                    .Include(x => x.Contract)
                    .ToList();
                if (historys == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var cshDTO = _mapper.Map<List<ContractStatusHistoryDTO>>(historys);
                return Ok(cshDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpGet]
        public IActionResult GetContractHistoryByDate(string date)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.ContractsStatusHistories
                    .Include(x => x.Contract)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var historydateDTO = _mapper.Map<List<ContractStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpGet]
        public IActionResult GetContractHistorys(string date, int cid)
        {
            try
            {
                DateTime startDate = DateTime.ParseExact(date, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.ContractsStatusHistories
                    .Include(x => x.Contract)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
                    && x.ContractId == cid)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var historydateDTO = _mapper.Map<List<ContractStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
    }
}
