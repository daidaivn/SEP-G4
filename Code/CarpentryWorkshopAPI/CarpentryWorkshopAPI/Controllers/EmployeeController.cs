﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Security.Cryptography;
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
        public ActionResult<CreateEmployeeDTO> CreateandUpdateEmployee([FromBody] CreateEmployeeDTO createEmployeeDTO)
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
                
                if (employee == null)
                {
                         var newemp = _mapper.Map<Employee>(createEmployeeDTO);
                        _context.Employees.Add(newemp);
                        _context.SaveChanges();
                        foreach (var rd in createEmployeeDTO.rDs)
                        {

                            RolesEmployee newremp = new RolesEmployee
                            {
                                RoleId = rd.RoleID,
                                EmployeeId = newemp.EmployeeId,
                                StartDate = createEmployeeDTO.StartDate,
                                DepartmentId = rd.DepartmentID,
                                Status = true,
                            };
                            _context.RolesEmployees.Add(newremp);
                        }
                   
                    _context.SaveChanges();
                    return Ok("Create employee successful");
                }
                else
                {
                foreach (var rd in createEmployeeDTO.rDs)
                {

                    var roleemployees = _context.RolesEmployees
                    .FirstOrDefault(x => x.EmployeeId == createEmployeeDTO.EmployeeId
                    && x.RoleId == rd.RoleID
                    && x.DepartmentId == rd.DepartmentID);

                           if (roleemployees != null)
                            {
                                roleemployees.Status = createEmployeeDTO.Status;
                                roleemployees.EndDate = DateTime.Now;
                            _context.RolesEmployees.Update(roleemployees);
                            }
                            else
                            {
                              RolesEmployee newremp = new RolesEmployee
                              {
                                RoleId = rd.RoleID,
                                EmployeeId = employee.EmployeeId,
                                StartDate = createEmployeeDTO.StartDate,
                                DepartmentId = rd.DepartmentID,
                                Status = true,
                              };
                            _context.RolesEmployees.Add(newremp);
                            }
                            
                        
                    }
                    _context.SaveChanges();
                    return Ok("Update roleemployee successfull");

                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        public IActionResult ChangeStatusEmployee( int eid)
        {
            var employees = _context.Employees
                .Include(x => x.Country)
                .Where(x => x.EmployeeId == eid).FirstOrDefault();
            if (employees == null)
            {
                return NotFound();
            }
            try
            {
                if (employees.Status == true)
                {
                    employees.Status = false;
                }
                else
                {
                    employees.Status = true;
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
                var query = _context.Employees
                       .Include(emp => emp.RolesEmployees)
                       .ThenInclude(roleemp => roleemp.Role)
                       .AsQueryable();

                if (!string.IsNullOrEmpty(employeeSearchDTO.PhoneNumber))
                {
                    query = query.Where(x => x.PhoneNumber.Equals(employeeSearchDTO.PhoneNumber));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Gender.ToString()))
                {
                    query = query.Where(x => x.Gender == employeeSearchDTO.Gender);
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Name))
                {
                    query = query.Where(x => x.FirstName.ToLower().Contains(employeeSearchDTO.Name.ToLower()));
                }
                if (!string.IsNullOrEmpty(employeeSearchDTO.Name))
                {
                    query = query.Where(x => x.LastName.ToLower().Contains(employeeSearchDTO.Name.ToLower()));
                }
                if (employeeSearchDTO.Status == true)
                {
                    query = query.Where(x => x.Status == true);
                }
                else if (employeeSearchDTO.Status == false)
                {
                    query = query.Where(x => x.Status == false); 
                }
                if (employeeSearchDTO.RoleID.Count > 0)
                {
                    query = query.Where(entity => employeeSearchDTO.RoleID.Any(searchRoleId => 
                    entity.RolesEmployees.Select(x => x.Role.RoleId).FirstOrDefault() == searchRoleId));
                }
                var employeesDTO = _mapper.Map<List<EmployeeListDTO>>(query.ToList());

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
