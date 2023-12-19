using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ILink;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;



namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class ContractController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        private readonly ILinkService _linkService;
        public ContractController(SEPG4CWMSContext context, IMapper mapper, ILinkService linkService)
        {
            _context = context;
            _mapper = mapper;
            _linkService = linkService;
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
                    .OrderByDescending(c => c.StartDate)
                    .Select(c => new ContractDTO
                    {
                        ContractId = c.ContractId,
                        ContractTypeId = c.ContractTypeId,
                        ContractTypeName = c.ContractType.ContractName,
                        EmployeeName = c.Employee.FirstName + " " + c.Employee.LastName,
                        StartDate = c.StartDate.Value.ToString("dd'-'MM'-'yyyy"),
                        EndDate = c.EndDate.Value.ToString("dd'-'MM'-'yyyy"),
                        LinkDoc = c.LinkDoc,
                        Status = c.Status,
                        ContractCode = c.ContractCode,
                        Image = c.Image,
                        Amount = c.Amount,
                        IsOffice = c.IsOffice
                    }).FirstOrDefault();
                if (employeecontract == null)
                {
                    return Ok("Nhân viên này chưa có hợp đồng nào");
                }
                return Ok(employeecontract);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
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
                    return NotFound("Không tìm thấy dữ liệu");
                }

                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbystart);
                return Ok(ctDTO);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
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
                        .Where(x => x.EndDate >= sdate && x.EndDate <= endDate && x.Status == true)
                        .Include(emp => emp.Employee)
                        .ToList();
                if (ctbyend == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbyend);
                return Ok(ctDTO);

            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpPost]
        public async Task<IActionResult> CreateContract([FromBody] CreateContractDTO createContractDTO, int employeeid)
        {
            try
            {
                var emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == employeeid);
                var newct = new Models.Contract();
                if (await _context.Contracts.AnyAsync(x => x.ContractCode.ToLower().Equals(createContractDTO.ContractCode.ToLower())))
                {
                    var history = await _context.UserAccountsStatusHistories.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefaultAsync();
                    if (history != null)
                    {
                        _context.UserAccountsStatusHistories.Remove(history);
                        _context.SaveChanges();
                    }
                    var account = await _context.UserAccounts.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefaultAsync();
                    if (account != null)
                    {
                        _context.UserAccounts.Remove(account);
                        _context.SaveChanges();
                    }
                    _context.Employees.Remove(emp);
                    _context.SaveChanges();
                    return StatusCode(409, "Mã hợp đồng đã tồn tại");
                }
                if (await _context.Contracts.AnyAsync(x => x.LinkDoc.ToLower().Equals(createContractDTO.LinkDoc.ToLower())))
                {
                    var history = await _context.UserAccountsStatusHistories.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefaultAsync();
                    if (history != null)
                    {
                        _context.UserAccountsStatusHistories.Remove(history);
                        _context.SaveChanges();
                    }
                    var account = await _context.UserAccounts.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefaultAsync();
                    if (account != null)
                    {
                        _context.UserAccounts.Remove(account);
                        _context.SaveChanges();
                    }
                    _context.Employees.Remove(emp);
                    _context.SaveChanges();
                    return StatusCode(409, "Đường dẫn hợp đồng đã tồn tại");
                }
                if (_linkService.UrlIsValid(createContractDTO.LinkDoc, "https://www.google.com/drive/") == false)
                {
                    var history = await _context.UserAccountsStatusHistories.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefaultAsync();
                    if (history != null)
                    {
                        _context.UserAccountsStatusHistories.Remove(history);
                        _context.SaveChanges();
                    }
                    var account = await _context.UserAccounts.Where(x => x.EmployeeId == emp.EmployeeId).FirstOrDefaultAsync();
                    if (account != null)
                    {
                        _context.UserAccounts.Remove(account);
                        _context.SaveChanges();
                    }
                    _context.Employees.Remove(emp);
                    _context.SaveChanges();
                    return StatusCode(409, "Đường dẫn chưa được triển khai");
                }

                var months = await _context.ContractTypes
                    .Where(x => x.ContractTypeId == createContractDTO.ContractTypeID)
                    .Select(x => x.Month)
                    .FirstOrDefaultAsync();
                newct = _mapper.Map<Models.Contract>(createContractDTO);
                newct.EndDate = newct.StartDate.Value.AddMonths((int)months);
                if (newct == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                newct.EmployeeId = emp.EmployeeId;
                newct.Status = true;
                _context.Contracts.Add(newct);
                _context.SaveChanges();

                emp.Status = true;
                _context.Employees.Update(emp);
                EmployeesStatusHistory ehistory = new EmployeesStatusHistory
                {
                    EmployeeId = emp.EmployeeId,
                    Action = "Change Status",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(ehistory);
                ContractsStatusHistory newhistory = new ContractsStatusHistory
                {
                    ContractId = newct.ContractId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.ContractsStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Tạo hợp đồng thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpPut]
        public async Task<IActionResult> UpdateContract([FromBody] CreateContractDTO createContractDTO)
        {
            try
            {
                var updatect = new Models.Contract();
                if (await _context.Contracts.AnyAsync(x => x.ContractId != createContractDTO.ContractId && x.ContractCode.ToLower().Equals(createContractDTO.ContractCode.ToLower())))
                {
                    return StatusCode(409, "Mã hợp đồng đã tồn tại");
                }
                if (await _context.Contracts.AnyAsync(x => x.ContractId != createContractDTO.ContractId && x.LinkDoc.ToLower().Equals(createContractDTO.LinkDoc.ToLower())))
                {
                    return StatusCode(409, "Đường dẫn hợp đồng đã tồn tại");
                }
                if (_linkService.UrlIsValid(createContractDTO.LinkDoc, "https://www.google.com/drive/") == false)
                {
                    return StatusCode(409, "Đường dẫn chưa được triển khai");
                }
                else
                {
                    var months = await _context.ContractTypes
                        .Where(x => x.ContractTypeId == createContractDTO.ContractTypeID)
                        .Select(x => x.Month)
                        .FirstOrDefaultAsync();
                    updatect = _mapper.Map<Models.Contract>(createContractDTO);
                    updatect.EndDate = updatect.StartDate.Value.AddMonths((int)months);
                    if (updatect == null)
                    {
                        return NotFound("Không tìm thấy dữ liệu");
                    }
                    _context.Contracts.Update(updatect);
                }
                ContractsStatusHistory newhistory = new ContractsStatusHistory
                {
                    ContractId = updatect.ContractId,
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.ContractsStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Chỉnh sửa hợp đồng thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [HttpPut]
        public IActionResult ChangeContractStatus(int contractId)
        {
            try
            {
                Models.Contract contract = new Models.Contract();

                contract = _context.Contracts
               .Include(ctt => ctt.ContractType)
               .Include(emp => emp.Employee)
               .FirstOrDefault(x => x.ContractId == contractId);
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
                return Ok("Chuyển trạng thái hợp đồng thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

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
                        return NotFound("Không tìm thấy dữ liệu");
                    }
                }
                var ctDTO = _mapper.Map<List<ContractDTO>>(ctbystart);
                return Ok(ctDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

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
                    Amount = c.Amount
                });
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
    }
}
