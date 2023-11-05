using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection.Metadata.Ecma335;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{
    
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class RoleController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public RoleController(SEPG4CCMSContext context, IMapper mapper)
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
                    .Include(x =>x.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .Select(roled => new RoleDetailDTO
                    {
                        RoleID = roled.RoleId,
                        RoleName = roled.RoleName,
                        Status = roled.Status,
                        Employees = roled.RolesEmployees.Where(roleemp => roleemp.Employee.Status == true)
                        .Select(x => x.Employee.FirstName + " " + x.Employee.LastName).ToList(),
                        NumberOfEmployee = roled.RolesEmployees.Count(roleemp => roleemp.EndDate == null)
                    });
                if (rolelist == null)
                {
                    return NotFound();
                }
                return Ok(rolelist);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
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
                        .Select(x => x.Employee.FirstName + " " + x.Employee.LastName).ToList(),
                        NumberOfEmployee = roled.RolesEmployees.Select(x => x.Employee).Count(),
                    }).ToList();
                if (role == null)
                {
                    return NotFound();
                }
                return Ok(role);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
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
                    RoleId= newrole.RoleId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.RolesStatusHistories.Add(newhistory);
                _context.SaveChanges();
                return Ok("Create role succesful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
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
                    return NotFound();
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
                return Ok("Update role successful");

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
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
                    return NotFound();
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
                return Ok("Change roles status succesful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [Authorize(Roles = "Role")]
        [HttpPost]
        public IActionResult SearchRole([FromBody] RoleSearchDTO roleSearchDTO)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(roleSearchDTO.InputText))
                {
                    return BadRequest("Search input is empty");
                }
                var query = _context.Roles
                    .Include(x => x.RolesEmployees)
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
                        Employees = r.RolesEmployees
                            .Where(x => x.Employee != null && x.Employee.Status == true)
                            .Select(x => x.Employee.FirstName + " " + x.Employee.LastName)
                            .ToList(),
                        NumberOfEmployee = r.RolesEmployees.Select(x => x.Employee).Count(),
                    }
                    );
               
                return Ok(roles);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
