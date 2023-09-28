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

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("api/[controller]")]
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
        public IActionResult GetDepartments()
        {
          if (_context.Departments == null)
          {
              return NotFound();
          }
          List<Department> list = _context.Departments.ToList();
          List<DepartmentDTO> listDTO = _mapper.Map<List<DepartmentDTO>>(list);
          return Ok(listDTO);
        }

        // GET: api/Departments/5
        [HttpGet("{id}")]
        public IActionResult GetDepartment(int id)
        {
          if (_context.Departments == null)
          {
              return NotFound();
          }
            var department = _context.Departments.Where(e=>e.DepartmentId == id).FirstOrDefault();
            DepartmentDTO departmentDTO = _mapper.Map<DepartmentDTO>(department);
            if (department == null)
            {
                return NotFound();
            }
            return Ok(departmentDTO);
        }

        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult PutDepartment(int id, [FromBody]DepartmentDTO departmentDTO)
        {
            if (id != departmentDTO.DepartmentId)
            {
                return BadRequest();
            }
            Department department = _mapper.Map<Department>(departmentDTO);
            _context.Entry(department).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("Update success");
        }

        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostDepartment([FromBody]DepartmentDTO departmentDTO)
        {
          if (_context.Departments == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.Departments'  is null.");
          }
            Department department = _mapper.Map<Department>(departmentDTO);
            _context.Departments.Add(department);
            _context.SaveChanges();

            return CreatedAtAction("GetDepartment", new { id = department.DepartmentId }, department);
        }

        // DELETE: api/Departments/5
        [HttpDelete("{id}")]
        public IActionResult UpdateDepartment(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound();
            }
            Department department = _context.Departments.SingleOrDefault(e=>e.DepartmentId == id);
            if (department == null)
            {
                return NotFound();
            }
            else
            {
                department.Status = false;
                _context.Departments.Update(department);
            }

            
            _context.SaveChangesAsync();

            return Ok("Update status success");
        }
        [HttpGet("DepartmentDetail/{id}")]
        public IActionResult GetDepartmentDetail(int id)
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
                                       Roles = emp.RolesEmployees.Select(re => re.Role.RoleName).ToList(),
                                       Status = emp.Status,
                                   };
                return Ok(employeeList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        private bool DepartmentExists(int id)
        {
            return (_context.Departments?.Any(e => e.DepartmentId == id)).GetValueOrDefault();
        }
    }
}
