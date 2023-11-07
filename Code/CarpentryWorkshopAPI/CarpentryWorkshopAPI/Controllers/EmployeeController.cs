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

namespace CarpentryWorkshopAPI.Controllers
{
    [Authorize(Roles = "ListEmployee")]
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class EmployeeController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;
        public EmployeeController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        
        [HttpGet]
        public IActionResult GetAllEmployee()
        {
            try
            {
                var employeelist = _context.Employees
                    .Include(x => x.Country)
                    .Include(emp => emp.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .Select(emp => new EmployeeListDTO
                    {
                        EmployeeID = emp.EmployeeId,
                        Image = emp.Image,
                        FullName = $"{emp.FirstName} {emp.LastName}",
                        Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                        PhoneNumber = emp.PhoneNumber,
                        Roles = emp.RolesEmployees
                        .OrderByDescending(re => re.Role.RoleLevel)
                        .Select(re => re.Role.RoleName)
                        .FirstOrDefault(),
                        Status = emp.Status,
                    });
                return Ok(employeelist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }
        [HttpGet]
        public IActionResult GetEmployeeDetail(int eid)
        {
            try
            {
                var employeeDetailBasic = _context.Employees
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
                       FullName = emp.FirstName + " " + emp.LastName,
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
                   }).FirstOrDefault();
                   
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
        [HttpGet]
        public IActionResult GetEmployeeDependent(int eid)
        {
            try
            {
                var employeeDepend = _context.Dependents
                    .Where(x => x.EmployeeId == eid)
                    .ToList();
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
        [HttpPost]
        public IActionResult CreateEmployee([FromBody] CreateEmployeeDTO createEmployeeDTO)
        {
            try
            {

                var employee = _context.Employees
                   .Include(emp => emp.RolesEmployees)
                       .ThenInclude(roleemp => roleemp.Role)
                       .ThenInclude(role => role.RolesEmployees)
                   .Include(emp => emp.RolesEmployees)
                       .ThenInclude(roleemp => roleemp.Department)
                       .FirstOrDefault(x => x.EmployeeId == createEmployeeDTO.EmployeeId 
                       && x.PhoneNumber == createEmployeeDTO.PhoneNumber 
                       && x.Email == createEmployeeDTO.Email
                       && x.Cic == createEmployeeDTO.Cic);

                if (employee != null)
                {
                    return Ok("Nhân viên này đã tồn tại");
                }
                var newemp = _mapper.Map<Employee>(createEmployeeDTO);
                newemp.Status = false;
                _context.Employees.Add(newemp);
                _context.SaveChanges();
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
                UserAccount newaccount = new UserAccount()
                {

                };
                EmployeesStatusHistory newhistory = new EmployeesStatusHistory
                {
                    EmployeeId = newemp.EmployeeId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.EmployeesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("EmployeeID :" + newemp.EmployeeId);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult UpdateEmployee([FromBody] CreateEmployeeDTO createEmployeeDTO)
        {
            try
            {
                var employee = _context.Employees
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Role)
                      .ThenInclude(role => role.RolesEmployees)
                  .Include(emp => emp.RolesEmployees)
                      .ThenInclude(roleemp => roleemp.Department)
                      .FirstOrDefault(x => x.EmployeeId == createEmployeeDTO.EmployeeId);
                if (employee == null)
                {
                    return NotFound();
                }
                foreach (var rd in createEmployeeDTO.rDs)
                {
                    var roleemployees = _context.RolesEmployees
                    .Where(x => x.EmployeeId == createEmployeeDTO.EmployeeId)
                    .ToList();
                    foreach (var role in roleemployees)
                    {
                        if (role != null)
                        {
                            role.Status = createEmployeeDTO.Status;
                            role.EndDate = DateTime.Now;
                            _context.RolesEmployees.Update(role);
                        }
                    }
                  
                        RolesEmployee newremp = new RolesEmployee
                        {
                            RoleId = rd.RoleID,
                            EmployeeId = employee.EmployeeId,
                            StartDate = DateTime.Now,
                            EndDate = null,
                            DepartmentId = rd.DepartmentID,
                            Status = true,
                        };
                        _context.RolesEmployees.Add(newremp);
                    
                }
                employee.Image = createEmployeeDTO.Image;
                employee.FirstName = createEmployeeDTO.FirstName;
                employee.LastName = createEmployeeDTO.LastName;
                employee.Email = createEmployeeDTO.Email;
                employee.Address = createEmployeeDTO.Address;
                employee.Dob = DateTime.ParseExact(createEmployeeDTO.Dobstring, "dd-MM-yyyy",
                               System.Globalization.CultureInfo.InvariantCulture);
                employee.Gender = createEmployeeDTO.Gender;
                employee.PhoneNumber = createEmployeeDTO.PhoneNumber;
                employee.TaxId = createEmployeeDTO.TaxId;
                employee.Status = createEmployeeDTO.Status;
                employee.Cic = createEmployeeDTO.Cic;
                employee.CountryId = createEmployeeDTO.CountryId;
                employee.Status = createEmployeeDTO.Status;
                _context.Employees.Update(employee);
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
