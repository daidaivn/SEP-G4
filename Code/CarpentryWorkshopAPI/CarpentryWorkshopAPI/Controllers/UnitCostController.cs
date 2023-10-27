﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Asn1.Mozilla;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class UnitCostController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public UnitCostController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllUnitCosts()
        {
            try
            {
                var costs = _context.UnitCosts.ToList();
                if (costs == null)
                {
                    return NotFound();  
                }
                var dto = _mapper.Map<List<UnitCostDTO>>(costs);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost] 
        public IActionResult CreateAndUpdateUnitCost([FromBody] UnitCostDTO unitCostDTO)
        {
            try
            {
                if (unitCostDTO.UniCostId == 0)
                {
                    var dto = _mapper.Map<UnitCost>(unitCostDTO);
                    if (dto == null)
                    {
                        return BadRequest();
                    }
                    _context.UnitCosts.Add(dto);
                    _context.SaveChanges();
                    UnitCostStatusHistory history = new UnitCostStatusHistory()
                    {
                        UniCostId = dto.UniCostId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.UnitCostStatusHistories.Add(history);
                    _context.SaveChanges();
                    return Ok("Create unit cost successful");
                }
                else
                {
                    var dto = _mapper.Map<UnitCost>(unitCostDTO);
                    if (dto == null)
                    {
                        return BadRequest();
                    }
                    _context.UnitCosts.Update(dto);
                    UnitCostStatusHistory history = new UnitCostStatusHistory()
                    {
                        UniCostId = dto.UniCostId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.UnitCostStatusHistories.Add(history);
                    _context.SaveChanges();
                    return Ok("Update unit cost successful");
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Filter(bool status)
        {
            try
            {
                var ucs = _context.UnitCosts
                    .Where(x => x.Status == status)
                    .ToList();
                if (ucs == null)
                {
                    return NotFound();
                }
                return Ok(ucs);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}