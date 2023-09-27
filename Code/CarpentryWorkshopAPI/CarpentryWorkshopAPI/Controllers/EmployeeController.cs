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
        [HttpPost]
        public ActionResult<CreateEmployeeDTO> CreateEmployee([FromBody] CreateEmployeeDTO createEmployeeDTO)
        {
            try
            {
                Employee newemp = new Employee();            
                List<Role> roles = _context.Roles.ToList();
                List<Department> departments = _context.Departments.ToList();
                newemp.Image = createEmployeeDTO.Image;
                newemp.FirstName = createEmployeeDTO.FirstName;
                newemp.LastName = createEmployeeDTO.LastName;
                newemp.Email = createEmployeeDTO.Email;
                newemp.PhoneNumber = createEmployeeDTO.PhoneNumber;
                newemp.TaxId = createEmployeeDTO.TaxId;
                newemp.Dob = DateTime.Parse(createEmployeeDTO.Dob);
                newemp.Status = createEmployeeDTO.Status;
                newemp.Address = createEmployeeDTO.Address;
                newemp.Cic = createEmployeeDTO.Cic;
                newemp.CountryId= createEmployeeDTO.CountryId;
                if (createEmployeeDTO.Gender.Equals("Nam"))
                {
                    newemp.Gender = true;
                }
                else if (createEmployeeDTO.Gender.Equals("Nữ"))
                {
                    newemp.Gender = false;
                }

                _context.Employees.Add(newemp);
                _context.SaveChanges();

                foreach (var rname in createEmployeeDTO.Roles)
                {
                    foreach (var item in roles)
                    {
                        if (item.RoleName.ToLower().Equals(rname.ToLower()))
                        {
                            foreach (var dname in createEmployeeDTO.Department)
                            {
                                foreach (var department in departments)
                                {
                                    if (department.DepartmentName.ToLower().Equals(dname.ToLower()))
                                    {
                                        RolesEmployee newremp = new RolesEmployee
                                        {
                                            RoleId = item.RoleId,
                                            EmployeeId = newemp.EmployeeId,
                                            StartDate = DateTime.Parse(createEmployeeDTO.StartDate),
                                            EndDate = DateTime.Parse(createEmployeeDTO.EndDate),
                                            DepartmentId = department.DepartmentId 
                                        };
                                        _context.RolesEmployees.Add(newremp);
                                    }
                                }
                            }
                        }
                    }
                }
                
                
                _context.SaveChanges();
                return Ok("Create employee successful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPut("{eid}")]
        public IActionResult UpdateEmployee(int eid, [FromBody] CreateEmployeeDTO createEmployeeDTO)
        {
            try
            {
                Employee updateemp = _context.Employees
                    .Include(x => x.Country)
                    .Where(x => x.EmployeeId == eid)
                    .FirstOrDefault();
                    ;
                if (updateemp == null)
                {
                    return NotFound();
                }
                List<Role> roles = _context.Roles.ToList();
                List<Department> departments = _context.Departments.ToList();
                updateemp.Image = createEmployeeDTO.Image;
                updateemp.FirstName = createEmployeeDTO.FirstName;
                updateemp.LastName = createEmployeeDTO.LastName;
                updateemp.Email = createEmployeeDTO.Email;
                updateemp.PhoneNumber = createEmployeeDTO.PhoneNumber;
                updateemp.TaxId = createEmployeeDTO.TaxId;
                updateemp.Dob = DateTime.Parse(createEmployeeDTO.Dob);
                updateemp.Status = createEmployeeDTO.Status;
                updateemp.Address = createEmployeeDTO.Address;
                updateemp.Cic = createEmployeeDTO.Cic;
                updateemp.CountryId = createEmployeeDTO.CountryId;
                if (createEmployeeDTO.Gender.Equals("Nam"))
                {
                    updateemp.Gender = true;
                }
                else if (createEmployeeDTO.Gender.Equals("Nữ"))
                {
                    updateemp.Gender = false;
                }
                _context.Employees.Update(updateemp);
                _context.SaveChanges();
                foreach (var rname in createEmployeeDTO.Roles)
                {
                    foreach (var item in roles)
                    {
                        if (item.RoleName.ToLower().Equals(rname.ToLower()))
                        {
                            foreach (var dname in createEmployeeDTO.Department)
                            {
                                foreach (var department in departments)
                                {
                                    if (department.DepartmentName.ToLower().Equals(dname.ToLower()))
                                    {
                                        RolesEmployee newremp = new RolesEmployee
                                        {
                                            RoleId = item.RoleId,
                                            EmployeeId = updateemp.EmployeeId,
                                            StartDate = DateTime.Parse(createEmployeeDTO.StartDate),
                                            EndDate = DateTime.Parse(createEmployeeDTO.EndDate),
                                            DepartmentId = department.DepartmentId
                                        };
                                        _context.RolesEmployees.Update(newremp);
                                    }
                                }
                            }
                        }
                    }
                }
                _context.SaveChanges();
                return Ok("Update employee successfull");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public IActionResult ChangeStatusEmployee(List<int> eids)
        {
            var employees = _context.Employees
                .Include(x => x.Country)
                .ToList();
            if (employees == null)
            {
                return NotFound();
            }
            try
            {
                foreach (var item in employees)
                {
                    foreach (var id in eids)
                    {
                        if (item.EmployeeId == id)
                        {
                            if (item.Status == true)
                            {
                                item.Status = false;
                            }
                            else
                            {
                                item.Status = true;
                            }
                        }
                    }
                }
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
                List<EmployeeListDTO> searchlist = new List<EmployeeListDTO>();
                var query = _context.Employees
                    .Include(x => x.Country)
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(x => x.Role)
                    .AsQueryable();

                if (employeeSearchDTO.EmployeeId != 0)
                {
                    query = query.Where(x => x.EmployeeId == employeeSearchDTO.EmployeeId);
                }
                if (employeeSearchDTO.TaxId != 0)
                {
                    query = query.Where(x => x.TaxId == employeeSearchDTO.TaxId);
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Country))
                {
                    query = query.Where(x => x.Country.CountryName.ToLower().Contains(employeeSearchDTO.Country.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.FirstName))
                {
                    query = query.Where(x => x.FirstName.ToLower().Contains(employeeSearchDTO.FirstName.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.LastName))
                {
                    query = query.Where(x => x.LastName.ToLower().Contains(employeeSearchDTO.LastName.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Address))
                {
                    query = query.Where(x => x.Address.ToLower().Contains(employeeSearchDTO.Address.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.PhoneNumber))
                {
                    query = query.Where(x => x.PhoneNumber.ToLower().Contains(employeeSearchDTO.PhoneNumber.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Cic))
                {
                    query = query.Where(x => x.Cic.ToLower().Contains(employeeSearchDTO.Cic.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Email))
                {
                    query = query.Where(x => x.Email.ToLower().Contains(employeeSearchDTO.Email.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Dob))
                {
                    DateTime date = DateTime.Parse(employeeSearchDTO.Dob);
                    query = query.Where(x => x.Dob == date);
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Gender))
                {
                    if (employeeSearchDTO.Gender.Equals("Nam"))
                    {
                        query = query.Where(x => x.Gender == true);
                    }
                    else if (employeeSearchDTO.Gender.Equals("Nữ"))
                    {
                        query = query.Where(x => x.Gender == false);
                    }
                }
                if (employeeSearchDTO.Status == true)
                {
                    query = query.Where(x => x.Status == true);
                }
                else if (employeeSearchDTO.Status == false)
                {
                    query = query.Where(x => x.Status == false);
                }
                var employeesDTO = _mapper.Map<List<Employee>, List<EmployeeSearchDTO>>(query.ToList());

                if (employeesDTO.Count == 0)
                {
                    return NotFound();
                }

                return Ok(employeesDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
