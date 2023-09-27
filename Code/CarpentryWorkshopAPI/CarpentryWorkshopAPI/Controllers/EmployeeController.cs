using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

namespace CarpentryWorkshopAPI.Controllers
{
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
                        Roles = emp.RolesEmployees.Select(re => re.Role.RoleName).ToList(),
                        Status = emp.Status,
                    });
                return Ok(employeelist);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
           
        }
        [HttpGet("{eid}")]
        public IActionResult GetEmployeeDetail(int eid)
        {
            try
            {
                var employeeDetail = _context.Employees
                    .Where(emp => emp.EmployeeId == eid)
                    .Include(emp => emp.RolesEmployees)
                        .ThenInclude(roleemp => roleemp.Role)
                        .ThenInclude(role => role.RolesEmployees)
                    .Include(emp => emp.RolesEmployees)
                        .ThenInclude(roleemp => roleemp.Department)
                    .Select(emp => new EmployeeDetailDTO
                    {
                        EmployeeId = emp.EmployeeId,
                        Image = emp.Image,
                        FirstName = emp.FirstName,
                        LastName = emp.LastName,
                        Dob = emp.Dob,
                        Address = emp.Address,
                        Cic = emp.Cic,
                        Country = emp.Country.CountryName,
                        Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                        PhoneNumber = emp.PhoneNumber,
                        TaxId = emp.TaxId,
                        Email= emp.Email,
                        Status = emp.Status,
                        Roles = (List<string>)emp.RolesEmployees.Select(roleemp => roleemp.Role.RoleName),
                        Departments = (List<string>)emp.RolesEmployees.Select(roleemp => roleemp.Department.DepartmentName)
                    })
                    .FirstOrDefault();

                if (employeeDetail == null)
                {
                    return NotFound();
                }

                return Ok(employeeDetail);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpPost]
        //public ActionResult<CreateEmployeeDTO> CreateEmployee([FromBody] CreateEmployeeDTO createEmployeeDTO)
        //{
        //    try
        //    {
        //        var newemp = _mapper.Map<CreateEmployeeDTO, Employee>(createEmployeeDTO);
        //        _context.Employees.Add(newemp);
        //        _context.SaveChanges();
        //        return Ok("Create employee successfull");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //}
        //[HttpPut("{eid}")]
        //public IActionResult UpdateEmployee(int eid, [FromBody] CreateEmployeeDTO createEmployeeDTO)
        //{
        //    try
        //    {
        //        var currentemp = _context.Employees
        //            .Include(x => x.Department)
        //            .Include(x => x.Country)
        //            .Where(x => x.EmployeeId == eid)
        //            .FirstOrDefault();
        //        if (currentemp == null)
        //        {
        //            return NotFound();
        //        }
        //        currentemp.Image = createEmployeeDTO.Image;
        //        currentemp.PhoneNumber = createEmployeeDTO.PhoneNumber;
        //        currentemp.FirstName = createEmployeeDTO.FirstName;
        //        currentemp.LastName = createEmployeeDTO.LastName;
        //        currentemp.Address = createEmployeeDTO.Address;
        //        currentemp.Cic = createEmployeeDTO.Cic;
        //        currentemp.Dob = createEmployeeDTO.Dob;
        //        currentemp.Gender = createEmployeeDTO.Gender;
        //        currentemp.CountryId = createEmployeeDTO.CountryId;
        //        currentemp.DepartmentId = createEmployeeDTO.DepartmentId;
        //        currentemp.Status = createEmployeeDTO.Status;
        //        //currentemp.RolesEmployees = createEmployeeDTO.RolesEmployees;
        //        _context.Employees.Update(currentemp);
        //        _context.SaveChanges();
        //        return Ok("Update success");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpDelete]
        //public IActionResult DeleteProduct(List<int> eid)
        //{
        //    var employee = _context.Employees
        //        .Include(x => x.Country)
        //        .ToList();
        //    if (employee == null)
        //    {
        //        return NotFound();
        //    }
        //    var useraccount = _context.UserAccounts
        //        .ToList();
        //    var rolesemployee = _context.RolesEmployees
        //        .ToList();
        //    try
        //    {
        //        foreach (var item in useraccount)
        //        {
        //            if (item.EmployeeId == employee.EmployeeId)
        //            {
        //                useraccount.Remove(item);
        //                _context.SaveChanges();
        //            }
        //        }
        //        foreach (var item in rolesemployee)
        //        {
        //            if (item.EmployeeId == employee.EmployeeId)
        //            {
        //                rolesemployee.Remove(item);
        //                _context.SaveChanges();
        //            }
        //        }
        //        _context.Employees.Remove(employee);
        //        _context.SaveChanges();
        //        return Ok("Delete product successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
        //[HttpGet]
        //public IActionResult SearchEmployee(string firstName, string lastName, string gender,
        //    string address, string phone, string cic, DateTime? dob, string status, string departmentName, string countryName)
        //{
        //    try
        //    {
        //        List<EmployeeListDTO> searchlist = new List<EmployeeListDTO>();
        //        var query = _context.Employees
        //            .Include(x => x.Department)
        //            .Include(x => x.Country)
        //            .AsQueryable();

        //        if (!string.IsNullOrEmpty(firstName))
        //        {
        //            query = query.Where(x => x.FirstName.ToLower().Contains(firstName.ToLower()));
        //        }
        //        if (!string.IsNullOrEmpty(lastName))
        //        {
        //            query = query.Where(x => x.LastName.ToLower().Contains(lastName.ToLower()));
        //        }
        //        if (!string.IsNullOrEmpty(address))
        //        {
        //            query = query.Where(x => x.Address.ToLower().Contains(address.ToLower()));
        //        }
        //        if (!string.IsNullOrEmpty(phone))
        //        {
        //            query = query.Where(x => x.PhoneNumber.ToLower().Contains(phone.ToLower()));
        //        }
        //        if (!string.IsNullOrEmpty(cic))
        //        {
        //            query = query.Where(x => x.Cic.ToLower().Contains(cic.ToLower()));
        //        }
        //        if (!string.IsNullOrEmpty(departmentName))
        //        {
        //            query = query.Where(x => x.Department.DepartmentName.ToLower().Contains(departmentName.ToLower()));
        //        }
        //        if (!string.IsNullOrEmpty(gender))
        //        {
        //            if (gender.Equals("Nam"))
        //            {
        //                query = query.Where(x => x.Gender == true);
        //            }
        //            else if (gender.Equals("Nữ"))
        //            {
        //                query = query.Where(x => x.Gender == false);
        //            }
        //        }
        //        if (!string.IsNullOrEmpty(status))
        //        {
        //            if (gender.Equals("Kích hoạt"))
        //            {
        //                query = query.Where(x => x.Status == true);
        //            }
        //            else if (gender.Equals("Chưa kích hoạt"))
        //            {
        //                query = query.Where(x => x.Status == false);
        //            }
        //        }
        //        if (!string.IsNullOrEmpty(countryName))
        //        {
        //            query = query.Where(x => x.Country.CountryName.ToLower().Contains(countryName.ToLower()));
        //        }

        //        if (dob.HasValue)
        //        {
        //            query = query.Where(x => x.Dob == dob);
        //        }

        //        var employeesDTO = _mapper.Map<List<Employee>, List<EmployeeSearchDTO>>(query.ToList());

        //        if (employeesDTO.Count == 0)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(employeesDTO);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}

    }
}
