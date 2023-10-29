using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.Models;
using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using System.Text;
using System.Globalization;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;

        public DepartmentsController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Departments
        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var list = _context.Departments.Include(de => de.RolesEmployees).ThenInclude(de => de.Employee).ToList();
            List<DepartmentListDTO> listDTO = _mapper.Map<List<DepartmentListDTO>>(list);

            return Ok(listDTO);
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            var department = _context.Departments.Where(e => e.DepartmentId == id).FirstOrDefault();
            DepartmentListDTO departmentDTO = _mapper.Map<DepartmentListDTO>(department);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(departmentDTO);
        }

        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult UpdateDepartment([FromBody] DepartmentDTO departmentDTO)
        {
            
            try
            {
                var department = _mapper.Map<Department>(departmentDTO);
                _context.Entry(department).State = EntityState.Modified;
                _context.SaveChanges();
                DepartmentsStatusHistory departmentsStatusHistory = new DepartmentsStatusHistory()
                {
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = 1,
                    DepartmentId = departmentDTO.DepartmentId
                };
                _context.DepartmentsStatusHistories.Add(departmentsStatusHistory);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                
                
                    return BadRequest(ex.Message);
                
            }

            return Ok("Update success");
        }

        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult CreateDepartment(string departmentName)
        {
            if (_context.Departments == null)
            {
                return Problem("Entity set 'SEPG4CCMSContext.Departments'  is null.");
            }
            try
            {
                DepartmentDTO departmentDTO = new DepartmentDTO() 
                {
                    DepartmentId = 0,
                    DepartmentName= departmentName,
                    Status = true
                };
                var department = _mapper.Map<Department>(departmentDTO);
                _context.Departments.Add(department);
                _context.SaveChanges();
                DepartmentsStatusHistory departmentsStatusHistory = new DepartmentsStatusHistory()
                {
                    Action = "Insert",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = 1,
                    DepartmentId = department.DepartmentId
                };
                _context.DepartmentsStatusHistories.Add(departmentsStatusHistory);
                _context.SaveChanges();
                return Ok("Add Success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            

            
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public IActionResult UpdateDepartmentStatus(int id)
        {
            try
            {
                if (_context.Departments == null)
                {
                    return NotFound();
                }
                Department department = _context.Departments.Include(de => de.RolesEmployees).SingleOrDefault(e => e.DepartmentId == id);
                DepartmentsStatusHistory departmentsStatusHistory = new DepartmentsStatusHistory();
                if (department == null)
                {
                    return NotFound();
                }
                else
                {
                    if (department.Status == true)
                    {
                        departmentsStatusHistory.DepartmentId = id;
                        departmentsStatusHistory.Action = "Deactive";
                        departmentsStatusHistory.ActionDate = DateTime.Now;
                        departmentsStatusHistory.CurrentEmployeeId = 1;
                        department.Status = false;
                    }
                    else
                    {
                        departmentsStatusHistory.DepartmentId = id;
                        departmentsStatusHistory.Action = "Active";
                        departmentsStatusHistory.ActionDate = DateTime.Now;
                        departmentsStatusHistory.CurrentEmployeeId = 1;
                        department.Status = true;
                    }

                    _context.Departments.Update(department);
                }

                _context.DepartmentsStatusHistories.Add(departmentsStatusHistory);
                _context.SaveChangesAsync();

                return Ok("Update status success");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("DepartmentDetail/{id}")]
        public IActionResult GetEmployeeInDepartment(int id)
        {
            try
            {
                var employeeList = from re in _context.RolesEmployees.Where(re => re.DepartmentId == id)
                                   from emp in _context.Employees.Where(e => e.EmployeeId == re.EmployeeId).ToList()
                                   select new EmployeeListDTO
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
                                   };
                return Ok(employeeList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost("search")]
        public ActionResult<DepartmentListDTO> SearchAndFilterDepartment(DepartmentDTO departmentDTO)
        {
            if (departmentDTO == null || _context.Departments == null)
            {
                return BadRequest();
            }

            var listDepartment = _context.Departments.Include(de => de.RolesEmployees).ThenInclude(de => de.Employee).ToList().AsQueryable();

            if (!string.IsNullOrEmpty(departmentDTO.DepartmentName))
            {
                string searchTerm = departmentDTO.DepartmentName.ToLower().Normalize(NormalizationForm.FormD);
                listDepartment = listDepartment.Where(ld => ld.DepartmentName.ToLower().Normalize(NormalizationForm.FormD).Contains(searchTerm));
            }

            if (departmentDTO.Status.HasValue)
            {
                listDepartment = listDepartment.Where(ld => ld.Status == departmentDTO.Status);
            }

            var departmentDTOs = _mapper.Map<List<DepartmentListDTO>>(listDepartment);

            return Ok(departmentDTOs);
        }
        //[HttpPost]
        //private string RemoveDiacritics(string text)
        //{
        //    string normalizedText = text.Normalize(NormalizationForm.FormD);
        //    StringBuilder result = new StringBuilder();

        //    foreach (char c in normalizedText)
        //    {
        //        if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
        //        {
        //            result.Append(c);
        //        }
        //    }

        //    return result.ToString();
        //}

    }
}
