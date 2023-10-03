using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;

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
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate,
                        EndDate = c.EndDate,
                        LinkDoc = c.LinkDoc
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
                    .Include(emp => emp.Employee)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate,
                        EndDate = c.EndDate,
                        LinkDoc = c.LinkDoc
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
        [HttpGet]
        public IActionResult GetContractByStartDate(DateTime startDate)
        {
            try
            {
                var ctbystart = _context.Contracts
                    .Where(x => x.StartDate == startDate)
                    .Include(emp => emp.Employee)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate,
                        EndDate = c.EndDate,
                        LinkDoc = c.LinkDoc
                    }).ToList();
                if (ctbystart == null)
                {
                    return NotFound();
                }
                return Ok(ctbystart);

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
    }
}
