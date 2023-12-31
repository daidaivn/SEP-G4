﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{

    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class RoleController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public RoleController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [Authorize(Roles = "Role,ListEmployee,Decentralization,TimeKeeping")]
        [HttpGet]
        public IActionResult GetAllRoles()
        {
            try
            {
                var rolelist = _context.Roles
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .Select(roled => new RoleDetailDTO
                    {
                        RoleID = roled.RoleId,
                        RoleName = roled.RoleName,
                        Status = roled.Status,
                        Employees = roled.RolesEmployees.Where(roleemp => roleemp.Employee.Status == true && roleemp.EndDate == null)
                        .Select(x => new RoleDetailDTO.EmployeeRole
                        {
                            EmployeeId = x.EmployeeId,
                            EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                        }
                        ).ToList(),
                        NumberOfEmployee = roled.RolesEmployees.Count(roleemp => roleemp.EndDate == null)
                    });
                if (rolelist == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(rolelist);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetRolesByDepartmentId(int departmentId)
        {
            try
            {
                var department = await _context.Departments
                    .AsNoTracking()
                    .FirstOrDefaultAsync(d => d.DepartmentId == departmentId);
                var roles = new List<Role>();
                if (department == null)
                {
                    return NotFound($"Phòng ban với mã {departmentId} không tồn tại");
                }
                string rol = "Trưởng phòng";
                var rolemp = await _context.RolesEmployees
                    .Where(x => x.DepartmentId == department.DepartmentId && x.EndDate == null)
                    .Select(x => x.RoleId)
                    .ToListAsync();
                roles = await _context.Roles
                     .AsNoTracking()
                     .Where(r => r.IsOffice == department.IsOffice)
                     .ToListAsync();
                foreach (var item in rolemp)
                {
                    var emprole = await _context.Roles.Where(x => x.RoleId == item).FirstOrDefaultAsync();
                    if (emprole.RoleName.ToLower().Contains(rol.ToLower()))
                    {
                        roles = await _context.Roles
                         .AsNoTracking()
                         .Where(r => r.IsOffice == department.IsOffice && r.RoleId != emprole.RoleId)
                         .ToListAsync();
                    }
                }
                    
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi máy chủ: {ex.Message}");
            }
        }

        [HttpGet]
        public IActionResult GetRoleEmployeeById(int roleid)
        {
            try
            {
                var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
                var employeeIdLength = maxEmployeeId.ToString().Length;
                var rolelist = _context.Roles
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Department)
                    .Where(x => x.RoleId == roleid)
                    .Select(roled => new EmployeeRoleDTO
                    {
                        RoleID = roled.RoleId,
                        RoleName = roled.RoleName,
                        Employees = roled.RolesEmployees
                        .Where(roleemp => roleemp.Employee.Status == true && roleemp.EndDate == null)
                        .Select(x => new EmployeeRoleDTO.EmployeeRoles
                        {
                            EmployeeId = x.EmployeeId,
                            EmployeeIdstring = x.EmployeeId.ToString().PadLeft(employeeIdLength, '0'),
                            EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                            DepartmentId = x.DepartmentId,
                            DepartmentName = x.Department.DepartmentName,
                        }
                        ).OrderBy(x => x.DepartmentName).ToList(),

                    }).FirstOrDefault();
                if (rolelist == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(rolelist);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetRoleById(int rid)
        {
            try
            {
                var role = _context.Roles
                    .Where(x => x.RoleId == rid)
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .Select(roled => new RoleDetailDTO
                    {
                        RoleID = roled.RoleId,
                        RoleName = roled.RoleName,
                        Status = roled.Status,
                        Employees = roled.RolesEmployees.Where(roleemp => roleemp.Employee.Status == true)
                        .Select(x => new RoleDetailDTO.EmployeeRole
                        {
                            EmployeeId = x.EmployeeId,
                            EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                        }
                        ).ToList(),
                        NumberOfEmployee = roled.RolesEmployees.Select(x => x.Employee).Count(),
                    }).FirstOrDefault();
                if (role == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(role);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [Authorize(Roles = "Role")]
        [HttpPost]
        public ActionResult<Role> CreateRoles([FromBody] RoleDTO roleDTO)
        {
            try
            {
                var newrole = _mapper.Map<Role>(roleDTO);
                if (newrole == null)
                {
                    return NotFound();
                }
                _context.Roles.Add(newrole);
                _context.SaveChanges();
                RolesStatusHistory newhistory = new RolesStatusHistory
                {
                    RoleId = newrole.RoleId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.RolesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Tạo chức vụ thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [Authorize(Roles = "Role")]
        [HttpPut]
        public IActionResult UpdateRole([FromBody] RoleDTO roleDTO)
        {
            try
            {
                var updaterole = _mapper.Map<Role>(roleDTO);
                if (updaterole == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                _context.Roles.Update(updaterole);
                RolesStatusHistory newhistory = new RolesStatusHistory
                {
                    RoleId = updaterole.RoleId,
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.RolesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Chỉnh sửa chức vụ thành công");

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [Authorize(Roles = "Role")]
        [HttpPut]
        public IActionResult ChangeStatusRole(int rid)
        {
            try
            {
                var changeroles = _context.Roles.ToList();
                if (changeroles == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                foreach (var item in changeroles)
                {

                    if (item.RoleId == rid)
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
                RolesStatusHistory newhistory = new RolesStatusHistory
                {
                    RoleId = rid,
                    Action = "Change Status",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.RolesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Chuyển trạng thái chức vụ thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [Authorize(Roles = "Role")]
        [HttpPost]
        public IActionResult SearchRole([FromBody] RoleSearchDTO roleSearchDTO)
        {
            try
            {
                var query = _context.Roles
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Employee)
                    .ToList()
                    .AsQueryable();
                if (!string.IsNullOrEmpty(roleSearchDTO.InputText))
                {
                    string name = roleSearchDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                    query = query.Where(x => x.RoleName.ToLower().Normalize(NormalizationForm.FormD).Contains(name));
                }
                if (roleSearchDTO.Status.HasValue)
                {
                    query = query.Where(x => x.Status == roleSearchDTO.Status.Value);
                }
                var roles = query.Select(
                    r => new RoleDetailDTO
                    {
                        RoleID = r.RoleId,
                        RoleName = r.RoleName,
                        Status = r.Status,
                        Employees = r.RolesEmployees.Where(roleemp => roleemp.Employee.Status == true && roleemp.EndDate == null)
                        .Select(x => new RoleDetailDTO.EmployeeRole
                        {
                            EmployeeId = x.EmployeeId,
                            EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                        }
                        ).ToList(),
                        NumberOfEmployee = r.RolesEmployees.Count(roleemp => roleemp.EndDate == null)
                    }
                    );

                return Ok(roles);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult EditRole([FromBody] EditRoleDTO editRoleDTO)
        {
            try
            {
                var exdata = _context.RolesEmployees
                    .Where(x => x.EmployeeId == editRoleDTO.EmployeeId)
                    .ToList();
                foreach (var items in exdata)
                {
                    items.EndDate = DateTime.Now;
                    _context.RolesEmployees.Update(items);
                }
                _context.SaveChanges();

                foreach (var item in editRoleDTO.rds)
                {
                    if (item.RoleId == null || item.DepartmentId == null)
                    {
                        continue;
                    }

                    RolesEmployee newrd = new RolesEmployee()
                    {
                        EmployeeId = editRoleDTO.EmployeeId,
                        RoleId = item.RoleId,
                        DepartmentId = item.DepartmentId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                        Status = true
                    };
                    _context.RolesEmployees.Add(newrd);
                    _context.SaveChanges();
                }

                return Ok("Chỉnh sửa chức vụ thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public async Task<IActionResult> GetAllRolesByDepartmentId(int departmentId)
        {
            try
            {
                var department = await _context.Departments
                    .AsNoTracking()
                    .FirstOrDefaultAsync(d => d.DepartmentId == departmentId);

                if (department == null)
                {
                    return NotFound($"Department with ID {departmentId} not found.");
                }

                var roles = await _context.Roles
                    .AsNoTracking()
                    .Where(r => r.IsOffice == department.IsOffice)
                    .ToListAsync();

                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

    }
}
