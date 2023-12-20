using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.Account;
using CarpentryWorkshopAPI.Models;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{

    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly SEPG4CWMSContext _context;
        private IMapper _mapper;
        public EmployeeController(SEPG4CWMSContext context, IMapper mapper, IAccountService accountService)
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
                return BadRequest("Lỗi dữ liệu");
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
                       CountryId = emp.CountryId,
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
                    return NotFound("Không tìm thấy dữ liệu");
                }

                return Ok(employeeDetailBasic);

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetEmployeeDetailBasic(string employeeidstring)
        {
            try
            {
                string trimmedEmployeeIdString = employeeidstring.TrimStart('0');
                int eid = Int32.Parse(trimmedEmployeeIdString);
                var employeeDetailBasic = await _context.Employees
                   .Where(emp => emp.EmployeeId == eid)
                   .Include(emp => emp.RolesEmployees)
                   .ThenInclude(roleemp => roleemp.Role)
                   .ThenInclude(role => role.RolesEmployees)
                   .Include(emp => emp.RolesEmployees)
                   .ThenInclude(roleemp => roleemp.Department)
                   .Select(emp => new 
                   {
                       EmployeeId = emp.EmployeeId,
                       EmployeeIdstring = employeeidstring,
                       FullName = emp.LastName + " " + emp.FirstName,
                       Dobstring = emp.Dob.Value.ToString("dd'-'MM'-'yyyy"),
                       Address = emp.Address,
                       Cic = emp.Cic,
                       Country = emp.Country.CountryName,
                       CountryId = emp.CountryId,
                       Genderstring = (bool)emp.Gender ? "Nam" : "Nữ",
                       Gender = emp.Gender,
                       PhoneNumber = emp.PhoneNumber,
                       TaxId = emp.TaxId,
                       Email = emp.Email,
                       Status = emp.Status                   
                   }).FirstOrDefaultAsync();

                if (employeeDetailBasic == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }

                return Ok(employeeDetailBasic);

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var edDTO = _mapper.Map<List<EmployeeDependentDTO>>(employeeDepend);
                return Ok(edDTO);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                    return NotFound("Không tìm thấy dữ liệu");
                }
                _context.Employees.Remove(delete);
                _context.SaveChanges();
                return Ok("success");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                        return StatusCode(409, "Số điện thoại đã tồn tại");
                    }
                    else if (employee.Email == createEmployeeDTO.Email)
                    {
                        return StatusCode(409, "Email đã tồn tại");
                    }
                    else if (employee.Cic == createEmployeeDTO.Cic)
                    {
                        return StatusCode(409, "Mã định danh đã tồn tại");
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
                    return StatusCode(409, "Email chưa được đăng kí");
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
                    EmployeeId = newemp.EmployeeId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null
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
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public async Task<IActionResult> UpdateEmployee([FromBody] UpdateEmployeeDTO updateEmployeeDTO)
        {
            try
            {
                var employee = await _context.Employees
                    .Include(emp => emp.UserAccount)
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Role)
                      .ThenInclude(role => role.RolesEmployees)
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Department)
                      .FirstOrDefaultAsync(x => x.EmployeeId == updateEmployeeDTO.EmployeeId);
                var employeeEmail = employee.Email;

                if (employee == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.Email == updateEmployeeDTO.Email))
                {
                    return StatusCode(409, "Email đã tồn tại");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.PhoneNumber == updateEmployeeDTO.PhoneNumber))
                {
                    return StatusCode(409, "Số điện thoại đã tồn tại");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.TaxId == updateEmployeeDTO.TaxId))
                {
                    return StatusCode(409, "Mã số thuế đã tồn tại");
                }
                if (await _context.Employees.AnyAsync(x => x.EmployeeId != updateEmployeeDTO.EmployeeId && x.Cic == updateEmployeeDTO.Cic))
                {
                    return StatusCode(409, "Mã định danh đã tồn tại");
                }

                var checkEmail = _accountService.Check_Gmail(updateEmployeeDTO.Email);
                if (checkEmail == true)
                {
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
                    return StatusCode(409, "Email chưa được đăng kí");
                }
                if (updateEmployeeDTO.Email != employeeEmail) {
                    string htmlBody = "<p>Xin chào,</p>" +
                        "<p>Dưới đây là nội dung email của bạn:</p>" +
                        "<p>Thông tin email của bạn đã được thay đổi.</p>" +
                        "<p>Cảm ơn bạn đã đọc email này.</p>";
                    var email = new MimeMessage();
                    email.From.Add(MailboxAddress.Parse("ccmsadm12@gmail.com"));
                    email.To.Add(MailboxAddress.Parse($"{employeeEmail}"));
                    email.Subject = "Thông tin email đã được cập nhật";
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
                }
                EmployeesStatusHistory newhistory = new EmployeesStatusHistory
                {
                    EmployeeId = employee.EmployeeId,
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Cập nhận thông tin nhân viên thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                return NotFound("Không tìm thấy dữ liệu");
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
                    EmployeeId = employees.EmployeeId,
                    Action = "Change Status",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Chuyển đổi trạng thái nhân viên thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }


        }
        [Authorize(Roles = "ListEmployee")]
        [HttpPost]
        public IActionResult SearchEmployee([FromBody] EmployeeSearchDTO employeeSearchDTO)
        {
            try
            {
                var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
                var employeeIdLength = maxEmployeeId.ToString().Length;
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
                        x.PhoneNumber.ToLower().Normalize(NormalizationForm.FormD).Contains(input) ||
                        x.EmployeeId.ToString().PadLeft(employeeIdLength, '0').ToLower().Normalize(NormalizationForm.FormD).Contains(input)
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
                    EmployeeIdstring = employee.EmployeeId.ToString($"D{employeeIdLength}"),
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
                return BadRequest("Lỗi dữ liệu");
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
                return Ok("Chuyển đổi chức vụ trong phòng ban thành công.");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
