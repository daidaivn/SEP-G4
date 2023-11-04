using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Contracts;
using System.Security.Cryptography;
using System.Text;

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
        //[Authorize(Roles = "SystemManager")]
        [HttpGet]
        public IActionResult GetAllContract()
        {
            try
            {
                var contracts = _context.Contracts
                    .Where(x => x.Status == true)
                    .Include(emp => emp.Employee)
                    .Include(ctt => ctt.ContractType)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        ContractTypeName = c.ContractType.ContractName,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate.Value.ToString("dd'-'MM'-'yyyy"),
                        EndDate = c.EndDate.Value.ToString("dd'-'MM'-'yyyy"),
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
                    .Where(x => x.EmployeeId == eid && x.Status == true)
                    .Include(ctt => ctt.ContractType)
                    .Include(emp => emp.Employee)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        ContractTypeName = c.ContractType.ContractName,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate.Value.ToString("dd'-'MM'-'yyyy"),
                        EndDate = c.EndDate.Value.ToString("dd'-'MM'-'yyyy"),
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
        public IActionResult GetContractByStartDate(string startDate)
        {
            try
            {


                DateTime sdate = DateTime.ParseExact(startDate, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = sdate.AddDays(1).AddSeconds(-1);
                var ctbystart = _context.Contracts
                        .Where(x => x.StartDate >= sdate && x.StartDate <= endDate && x.Status == true)
                        .Include(emp => emp.Employee)
                        .ToList();
                    if (ctbystart == null)
                    {
                        return NotFound();
                    }
                    
                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbystart);
                return Ok(ctDTO);

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetContractByEndDate(string enddate)
        {
            try
            {


                DateTime sdate = DateTime.ParseExact(enddate, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                DateTime endDate = sdate.AddDays(1).AddSeconds(-1);
                var ctbyend = _context.Contracts
                        .Where(x => x.EndDate >= sdate && x.EndDate <= endDate && x.Status == true )
                        .Include(emp => emp.Employee)
                        .ToList();
                if (ctbyend == null)
                {
                    return NotFound();
                }
                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbyend);
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
                ContractsStatusHistory newhistory = new ContractsStatusHistory
                {
                    ContractId = newct.ContractId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.ContractsStatusHistories.Add(newhistory);
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
                var updatect = _mapper.Map<Models.Contract>(createContractDTO);
                if (updatect == null)
                {
                    return NotFound();
                }
                _context.Contracts.Update(updatect);
                ContractsStatusHistory newhistory = new ContractsStatusHistory
                {
                    ContractId= updatect.ContractId,
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.ContractsStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Update contract successfull");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
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
                ContractsStatusHistory newhistory = new ContractsStatusHistory
                {
                    ContractId = contract.ContractId,
                    Action = "Change Status",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.ContractsStatusHistories.Add(newhistory);
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
        [HttpPost]
        public IActionResult SearchContract([FromBody] SearchContractDTO searchContractDTO)
        {
            try
            {
              
                var query = _context.Contracts
                    .Include(emp => emp.Employee)
                    .Include(ctt => ctt.ContractType)
                    .ToList()
                    .AsQueryable();

                if (!string.IsNullOrEmpty(searchContractDTO.InputText))
                {
                    string input = searchContractDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                    query = query.Where(x => x.ContractType != null &&
                        x.ContractType.ContractName.ToLower().Normalize(NormalizationForm.FormD).Contains(input)
                    );
                }
                if (searchContractDTO.Status.HasValue)
                {
                    query = query.Where(x => x.Status == searchContractDTO.Status.Value);
                }
                var result = query.Select(c => new ContractDTO
                {
                    ContractId = c.ContractId,
                    ContractTypeName = c.ContractType.ContractName,
                    EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                    StartDate = c.StartDate.Value.ToString("dd'-'MM'-'yyyy"),
                    EndDate = c.EndDate.Value.ToString("dd'-'MM'-'yyyy"),
                    LinkDoc = c.LinkDoc,
                    Status = c.Status,
                    ContractCode = c.ContractCode,
                    Image = c.Image,
                });
                return Ok(result);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
