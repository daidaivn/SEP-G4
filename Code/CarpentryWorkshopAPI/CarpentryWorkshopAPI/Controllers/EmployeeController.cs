using AutoMapper;
using CarpentryWorkshopAPI.Attributes;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
using System.Security.Cryptography.Xml;
using System.Text;
using System.Globalization;
using System.Diagnostics.Contracts;
using Org.BouncyCastle.Asn1.Ocsp;
using MimeKit;
using MimeKit.Text;
using MailKit.Net.Smtp;
using CarpentryWorkshopAPI.IServices.Account;

namespace CarpentryWorkshopAPI.Controllers
{
    
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;
        public EmployeeController(SEPG4CCMSContext context, IMapper mapper, IAccountService accountService)
        {
            _context = context;
            _mapper = mapper;
            _accountService = accountService;
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
        {
            try
            {
                var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
                var employeeIdLength = maxEmployeeId.ToString().Length;
                var employeelist = await _context.Employees
                    .Include(x => x.Country)
                    .Include(emp => emp.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .Select(emp => new EmployeeListDTO
                    {
                        EmployeeID = emp.EmployeeId,
                        EmployeeIdstring = emp.EmployeeId.ToString($"D{employeeIdLength}"),
                        Image = emp.Image,
                        FullName = $"{emp.LastName} {emp.FirstName}",
                        Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                        PhoneNumber = emp.PhoneNumber,
                        Roles = emp.RolesEmployees
                        .Where(re => re.EndDate == null)
                        .OrderByDescending(re => re.Role.RoleLevel)
                        .Select(re => re.Role.RoleName)
                        .FirstOrDefault(),
                        Status = emp.Status,
                    }).ToListAsync();
                return Ok(employeelist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeDetail(int eid)
        {
            try
            {
                var employeeDetailBasic = await _context.Employees
                   .Where(emp => emp.EmployeeId == eid)
                   .Include(emp => emp.RolesEmployees)
                   .ThenInclude(roleemp => roleemp.Role)
                   .ThenInclude(role => role.RolesEmployees)
                   .Include(emp => emp.RolesEmployees)
                   .ThenInclude(roleemp => roleemp.Department)
                   .Select(emp => new EmployeeDetailBasicDTO
                   {
                       EmployeeId = emp.EmployeeId,
                       Image = emp.Image,
                       FullName = emp.LastName + " " + emp.FirstName,
                       Dobstring = emp.Dob.Value.ToString("dd'-'MM'-'yyyy"),
                       Address = emp.Address,
                       Cic = emp.Cic,
                       Country = emp.Country.CountryName,
                       CountryId= emp.CountryId,
                       Genderstring = (bool)emp.Gender ? "Nam" : "Nữ",
                       Gender = emp.Gender,
                       PhoneNumber = emp.PhoneNumber,
                       TaxId = emp.TaxId,
                       Email = emp.Email,
                       Status = emp.Status,
                       RoleDepartments = emp.RolesEmployees
                            .Where(e => e.EndDate == null)
                            .OrderByDescending(e => e.Role.RoleLevel)
                            .Select(roleemp => new EmployeeDetailBasicDTO.RoleDepartment
                            {
                                RoleID = roleemp.Role.RoleId,
                                RoleName = roleemp.Role.RoleName,
                                DepartmentID = roleemp.Department.DepartmentId,
                                DepartmentName = roleemp.Department.DepartmentName,
                            })
                            .ToList()
                   }).FirstOrDefaultAsync();
                   
                if (employeeDetailBasic == null)
                {
                    return NotFound();
                }

                return Ok(employeeDetailBasic);

            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpGet("{eid}")]
        //public IActionResult EditEmployeeDetail(int eid)
        //{
        //    try
        //    {
        //        var employeeDetail = _context.Employees
        //            .Where(emp => emp.EmployeeId == eid)
        //            .Include(emp => emp.RolesEmployees)
        //            .ThenInclude(roleemp => roleemp.Role)
        //            .ThenInclude(role => role.RolesEmployees)
        //            .Include(emp => emp.RolesEmployees)
        //            .ThenInclude(roleemp => roleemp.Department)
        //            .Select(emp => new EmployeeDetailDTO
        //            {
        //                EmployeeId = emp.EmployeeId,
        //                Image = emp.Image,
        //                FirstName = emp.FirstName,
        //                LastName = emp.LastName,
        //                Dobstring = emp.Dob.Value.ToString("dd'-'MM'-'yyyy"),
        //                Address = emp.Address,
        //                Cic = emp.Cic,
        //                Country = emp.Country.CountryName,
        //                Gender = (bool)emp.Gender ? "Nam" : "Nữ",
        //                PhoneNumber = emp.PhoneNumber,
        //                TaxId = emp.TaxId,
        //                Email= emp.Email,
        //                Status = emp.Status,
        //                RoleDepartments =emp.RolesEmployees
        //                    .Select(roleemp => new EmployeeDetailDTO.RoleDepartment
        //                    {
        //                        RoleID = roleemp.Role.RoleId,
        //                        RoleName = roleemp.Role.RoleName,
        //                        DepartmentID = roleemp.Department.DepartmentId,
        //                        DepartmentName = roleemp.Department.DepartmentName,
        //                    })
        //                    .ToList()
        //            })
        //            .FirstOrDefault();

        //        if (employeeDetail == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(employeeDetail);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        [Authorize(Roles = "ListEmployee")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeeDependent(int eid)
        {
            try
            {
                var employeeDepend = await _context.Dependents
                    .Where(x => x.EmployeeId == eid)
                    .ToListAsync();
                if (employeeDepend == null)
                {
                    return NotFound();
                }
                var edDTO = _mapper.Map<List<EmployeeDependentDTO>>(employeeDepend);
                return Ok(edDTO);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public IActionResult DeleteEmployee(int employeeid)
        {
            try
            {
                var delete = _context.Employees.FirstOrDefault(x => x.EmployeeId == employeeid);
                if (delete == null)
                {
                    return NotFound();
                }
                _context.Employees.Remove(delete);  
                _context.SaveChanges();
                return Ok("success");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public async Task<IActionResult> CreateEmployee([FromBody] CreateEmployeeDTO createEmployeeDTO)
        {
            try
            {

                var employee = await _context.Employees
                   .Include(emp => emp.RolesEmployees)
                       .ThenInclude(roleemp => roleemp.Role)
                       .ThenInclude(role => role.RolesEmployees)
                   .Include(emp => emp.RolesEmployees)
                       .ThenInclude(roleemp => roleemp.Department)
                       .FirstOrDefaultAsync(x => x.PhoneNumber == createEmployeeDTO.PhoneNumber 
                       || x.Email == createEmployeeDTO.Email
                       || x.Cic == createEmployeeDTO.Cic);

                if (employee != null)
                {
                    if (employee.PhoneNumber == createEmployeeDTO.PhoneNumber)
                    {
                        return StatusCode(503, "PhoneNumber already exists.");
                    }
                    else if (employee.Email == createEmployeeDTO.Email)
                    {
                        return StatusCode(501, "Email already exists.");
                    }
                    else if (employee.Cic == createEmployeeDTO.Cic)
                    {
                        return StatusCode(502, "Cic already exists.");
                    }
                }
                Employee newemp = new Employee();
               
                    var checkEmail = _accountService.Check_Gmail(createEmployeeDTO.Email);
                    if (checkEmail == true)
                    {
                        newemp = _mapper.Map<Employee>(createEmployeeDTO);
                        if (!newemp.Status.HasValue)
                        {
                            newemp.Status = true;
                        }
                        _context.Employees.Add(newemp);
                        _context.SaveChanges();
                    }
                    else
                    {
                        return StatusCode(550, "Authentication is Required for Relay");
                    }              
                foreach (var rd in createEmployeeDTO.rDs)
                {
                    RolesEmployee newremp = new RolesEmployee
                    {
                        RoleId = rd.RoleID,
                        EmployeeId = newemp.EmployeeId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                        DepartmentId = rd.DepartmentID,
                        Status = true,
                    };
                    _context.RolesEmployees.Add(newremp);
                }
                var username = _accountService.GenerateRandomString(8);
                var pass = _accountService.GenerateRandomString(8);
                UserAccount newaccount = new UserAccount()
                {
                    EmployeeId = newemp.EmployeeId,
                    UserName = username,
                    Password = BCrypt.Net.BCrypt.HashPassword(pass),
                    Status = true
                };
                _context.UserAccounts.Add(newaccount);
                _context.SaveChanges();
                UserAccountsStatusHistory newUahistory = new UserAccountsStatusHistory()
                {
                    EmployeeId= newemp.EmployeeId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId= null
                };
                _context.UserAccountsStatusHistories.Add(newUahistory);
                _context.SaveChanges();
                string htmlBody = "<p>Xin chào,</p>" +
                  "<p>Dưới đây là nội dung email của bạn:</p>" +
                  "<p><strong>Đây là tài khoản của bạn</strong></p>" +
                  "<h3>Tài khoản: </h3>" + $"<h4>{username}</h4>" +
                  "<h3>Mật khẩu: </h3>" + $"<h4>{pass}</h4>" +
                  "<p><strong>Nghiêm cấm lộ tài khoản ra ngoài</strong></p>" +
                  "<p>Cảm ơn bạn đã đọc email này.</p>";
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("ccmsadm12@gmail.com"));
                email.To.Add(MailboxAddress.Parse($"{newemp.Email}"));
                email.Subject = "Tài khoản của nhân viên";
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = htmlBody
                };
                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate("ccmsadm12@gmail.com", "iqmfipjieykysglr");
                smtp.Send(email);
                smtp.Disconnect(true);
                smtp.Dispose();
                EmployeesStatusHistory newhistory = new EmployeesStatusHistory
                {
                    EmployeeId = newemp.EmployeeId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok(newemp.EmployeeId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeDTO updateEmployeeDTO)
        {
            try
            {
                var allemployeesexcept = await _context.Employees
                    .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Role)
                      .ThenInclude(role => role.RolesEmployees)
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Department)
                      .Where(e => e.EmployeeId != updateEmployeeDTO.EmployeeId)
                    .ToListAsync();
                var employee = await _context.Employees
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Role)
                      .ThenInclude(role => role.RolesEmployees)
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Department)
                      .FirstOrDefaultAsync(x => x.EmployeeId == updateEmployeeDTO.EmployeeId);
                
                if (employee == null)
                {
                    return NotFound();
                }

                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.Email == updateEmployeeDTO.Email))
                {
                    return StatusCode(501, "Email already exists.");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.PhoneNumber == updateEmployeeDTO.PhoneNumber))
                {
                    return StatusCode(503, "Phone Number already exists.");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.TaxId == updateEmployeeDTO.TaxId))
                {
                    return StatusCode(504, "Tax ID already exists.");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.Cic == updateEmployeeDTO.Cic))
                {
                    return StatusCode(502, "CIC already exists.");
                }

                var checkEmail = _accountService.Check_Gmail(updateEmployeeDTO.Email);
                if (checkEmail == true) {
                    employee.Image = updateEmployeeDTO.Image;
                    employee.FirstName = updateEmployeeDTO.FirstName;
                    employee.LastName = updateEmployeeDTO.LastName;
                    employee.Email = updateEmployeeDTO.Email;
                    employee.Address = updateEmployeeDTO.Address;
                    employee.Dob = DateTime.ParseExact(updateEmployeeDTO.Dobstring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                    employee.Gender = updateEmployeeDTO.Gender;
                    employee.PhoneNumber = updateEmployeeDTO.PhoneNumber;
                    employee.TaxId = updateEmployeeDTO.TaxId;
                    employee.Status = updateEmployeeDTO.Status;
                    employee.Cic = updateEmployeeDTO.Cic;
                    employee.CountryId = updateEmployeeDTO.CountryId;
                    employee.Status = updateEmployeeDTO.Status;
                    _context.Employees.Update(employee);
                }
                else
                {
                    return StatusCode(550, "Authentication is Required for Relay");
                }
                var username = _accountService.GenerateRandomString(8);
                var pass = _accountService.GenerateRandomString(8);
                string htmlBody = "<p>Xin chào,</p>" +
                  "<p>Dưới đây là nội dung email của bạn:</p>" +
                  "<p><strong>Đây là tài khoản của bạn</strong></p>" +
                  "<h3>Tài khoản: </h3>" + $"<h4>{username}</h4>" +
                  "<h3>Mật khẩu: </h3>" + $"<h4>{pass}</h4>" +
                  "<p><strong>Nghiêm cấm lộ tài khoản ra ngoài</strong></p>" +
                  "<p>Cảm ơn bạn đã đọc email này.</p>";
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("ccmsadm12@gmail.com"));
                email.To.Add(MailboxAddress.Parse($"{employee.Email}"));
                email.Subject = "Tài khoản mới của nhân viên";
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = htmlBody
                };
                using var smtp = new SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate("ccmsadm12@gmail.com", "iqmfipjieykysglr");
                smtp.Send(email);
                smtp.Disconnect(true);
                smtp.Dispose();
                EmployeesStatusHistory newhistory = new EmployeesStatusHistory
                {
                    EmployeeId = employee.EmployeeId,
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Update employee and roleemployee successfull");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPut]
        public IActionResult ChangeStatusEmployee(int eid)
        {
            var employees = _context.Employees
                .Include(x => x.Country)
                .Where(x => x.EmployeeId == eid).FirstOrDefault();
            var contracts = _context.Contracts
                .Where(x => x.EmployeeId == eid)
                .ToList();
            if (employees == null)
            {
                return NotFound();
            }
            try
            {
                if (employees.Status == true)
                {
                    employees.Status = false;
                    foreach (var item in contracts)
                    {
                        item.Status = false;
                        ContractsStatusHistory history = new ContractsStatusHistory()
                        {
                            ContractId = item.ContractId,
                            Action = "Change Status",
                            ActionDate = DateTime.Now,
                            CurrentEmployeeId = null,
                        };
                        _context.ContractsStatusHistories.Add(history);
                    }
                }
                else
                {
                    employees.Status = true;
                    foreach (var item in contracts)
                    {
                        item.Status = true;
                        ContractsStatusHistory history = new ContractsStatusHistory()
                        {
                            ContractId = item.ContractId,
                            Action = "Change Status",
                            ActionDate = DateTime.Now,
                            CurrentEmployeeId = null,
                        };
                        _context.ContractsStatusHistories.Add(history);
                    }
                }
                EmployeesStatusHistory newhistory = new EmployeesStatusHistory
                {
                    EmployeeId= employees.EmployeeId,
                    Action = "Change Status",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Change employee status successfully");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }

      
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public IActionResult SearchEmployee([FromBody] EmployeeSearchDTO employeeSearchDTO)
        {
            try
            {
                var query = _context.Employees
                    .Include(emp => emp.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .ToList()
                    .AsQueryable();
                
                if (!string.IsNullOrEmpty(employeeSearchDTO.InputText))
                {
                    string input = employeeSearchDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                    query = query.Where(x =>
                        x.FirstName.ToLower().Normalize(NormalizationForm.FormD).Contains(input) ||
                        x.LastName.ToLower().Normalize(NormalizationForm.FormD).Contains(input) ||
                        x.PhoneNumber.ToLower().Normalize(NormalizationForm.FormD).Contains(input)
                    );
                }

                if (employeeSearchDTO.Gender.HasValue)
                {
                    query = query.Where(x => x.Gender == employeeSearchDTO.Gender.Value);
                }

                if (employeeSearchDTO.Status.HasValue)
                {
                    query = query.Where(x => x.Status == employeeSearchDTO.Status.Value);
                }

                if (employeeSearchDTO.RoleID.HasValue && employeeSearchDTO.RoleID.Value != 0)
                {
                    query = query.Where(entity =>
                        entity.RolesEmployees.Any(roleemp => roleemp.Role.RoleId == employeeSearchDTO.RoleID)
                    );
                }

                var employeesDTO = query.Select(employee => new EmployeeListDTO
                {
                    EmployeeID = employee.EmployeeId,
                    Image = employee.Image,
                    FullName = $"{employee.FirstName} {employee.LastName}",
                    Gender = (bool)employee.Gender ? "Nam" : "Nữ",
                    PhoneNumber = employee.PhoneNumber,
                    Roles = employee.RolesEmployees.OrderByDescending(re => re.Role.RoleLevel)
                        .Select(re => re.Role.RoleName)
                        .FirstOrDefault(),
                    Status = employee.Status
                });

                return Ok(employeesDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public IActionResult ChangeRoleInDepartment(int oldemployeeid, int oldroleid, int newemployeeid,
            int newroleid, int departmentid)
        {
            try
            {
                var old = _context.RolesEmployees
                    .Where(x => x.EmployeeId == oldemployeeid && x.RoleId == oldroleid && x.DepartmentId == departmentid)
                    .ToList();
                foreach (var ol in old)
                {
                    ol.EndDate = DateTime.Now;
                    _context.RolesEmployees.Update(ol);
                }
                var newemp = _context.RolesEmployees
                    .Where(x => x.EmployeeId == newemployeeid && x.RoleId == newroleid && x.DepartmentId == departmentid)
                    .ToList();
                foreach (var newe in newemp)
                {
                    newe.EndDate = DateTime.Now;
                    _context.RolesEmployees.Update(newe);
                }
                RolesEmployee newforold = new RolesEmployee()
                {
                    EmployeeId = newemployeeid,
                    RoleId = oldroleid,
                    DepartmentId = departmentid,
                    StartDate = DateTime.Now,
                    EndDate = null,
                    Status = true,
                };
                _context.RolesEmployees.Add(newforold);
                RolesEmployee oldfornew = new RolesEmployee()
                {
                    EmployeeId = oldemployeeid,
                    RoleId = newroleid,
                    DepartmentId = departmentid,
                    StartDate = DateTime.Now,
                    EndDate = null,
                    Status = true,
                };
                _context.RolesEmployees.Add(oldfornew);
                _context.SaveChanges();
                return Ok("Change role in department successful");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
