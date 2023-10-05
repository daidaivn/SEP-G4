﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using System.Security.Cryptography;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class ContractController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public ContractController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllContract()
        {
            try
            {
                var contracts = _context.Contracts
                    .Include(emp => emp.Employee)
                    .Include(ctt => ctt.ContractType)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        ContractTypeName = c.ContractType.ContractName,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate,
                        EndDate = c.EndDate,
                        LinkDoc = c.LinkDoc,
                        Status= c.Status,
                        ContractCode= c.ContractCode,
                        Image = c.Image,
                    }).ToList();
                if (contracts == null)
                {
                    return NotFound();
                }
                return Ok(contracts);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet]
        public IActionResult GetEmployeeContract(int eid)
        {
            try
            {
                var employeecontract = _context.Contracts
                    .Where(x => x.EmployeeId == eid)
                    .Include(ctt => ctt.ContractType)
                    .Include(emp => emp.Employee)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        ContractTypeName = c.ContractType.ContractName,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate,
                        EndDate = c.EndDate,
                        LinkDoc = c.LinkDoc,
                        Status = c.Status,
                        ContractCode = c.ContractCode,
                        Image = c.Image,
                    }).ToList();
                if (employeecontract == null)
                {
                    return NotFound();
                }
                return Ok(employeecontract);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetContractByDate([FromBody] ContractChangeDTO contractChangeDTO)
        {
            try
            {
                List<Models.Contract> ctbystart = new List<Models.Contract>();
                if (contractChangeDTO.StartDate.HasValue) {
                         ctbystart = _context.Contracts
                        .Where(x => x.StartDate == contractChangeDTO.StartDate)
                        .Include(emp => emp.Employee)
                        .ToList();
                    if (ctbystart == null)
                    {
                        return NotFound();
                    }
                }
                else if (contractChangeDTO.EndDate.HasValue)
                {
                    ctbystart = _context.Contracts
                       .Where(x => x.EndDate == contractChangeDTO.EndDate)
                       .Include(emp => emp.Employee)
                       .ToList();
                    if (ctbystart == null)
                    {
                        return NotFound();
                    }
                }
                //else if(contractChangeDTO.StartDate.HasValue && contractChangeDTO.EndDate.HasValue)
                //{
                //    ctbystart = _context.Contracts
                //      .Where(x => x.StartDate >= contractChangeDTO.StartDate || x.EndDate <= contractChangeDTO.EndDate)
                //      .Include(emp => emp.Employee)
                //      .ToList();
                //    if (ctbystart == null)
                //    {
                //        return NotFound();
                //    }
                //}
                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbystart);
                return Ok(ctDTO);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult CreateContract([FromBody] CreateContractDTO createContractDTO)
        {
            try
            {
                var newct = _mapper.Map<Models.Contract>(createContractDTO);
                if (newct == null)
                {
                    return NotFound();
                }
                _context.Contracts.Add(newct);
                _context.SaveChanges();
                return Ok("Create contract successfull");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut] 
        public IActionResult UpdateContract([FromBody] CreateContractDTO createContractDTO)
        {
            try
            {
                var newct = _mapper.Map<Models.Contract>(createContractDTO);
                if (newct == null)
                {
                    return NotFound();
                }
                _context.Contracts.Update(newct);
                _context.SaveChanges();
                return Ok("Update contract successfull");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public IActionResult ChangeContractStatus([FromBody] ContractChangeDTO contractChangeDTO)
        {
            try
            {
               Models.Contract contract = new Models.Contract();
                if (contractChangeDTO.ContractId != 0) {
                         contract = _context.Contracts
                        .Include(ctt => ctt.ContractType)
                        .Include(emp => emp.Employee)
                        .FirstOrDefault(x => x.ContractId == contractChangeDTO.ContractId);
                    if (contract == null)
                    {
                        return NotFound();
                    }
                    if (contract.Status == true)
                    {
                        contract.Status = false;
                    }
                    else
                    {
                        contract.Status = true;
                    }
                }
                _context.Contracts.Update(contract);
                _context.SaveChanges();
                return Ok("Change contract status successful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Filter([FromBody] ContractChangeDTO contractChangeDTO)
        {
            try
            {
                List<Models.Contract> ctbystart = new List<Models.Contract>();
                if (contractChangeDTO.Status.HasValue)
                {
                    ctbystart = _context.Contracts
                   .Where(x => x.Status == contractChangeDTO.Status)
                   .Include(emp => emp.Employee)
                   .ToList();
                    if (ctbystart == null)
                    {
                        return NotFound();
                    }
                }
                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbystart);
                return Ok(ctDTO);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}