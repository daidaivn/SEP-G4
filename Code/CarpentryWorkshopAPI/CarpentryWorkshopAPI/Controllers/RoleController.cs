using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Reflection.Metadata.Ecma335;

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
                        Employees = roled.RolesEmployees.Select(x => x.Employee.FirstName + " " + x.Employee.LastName).ToList(),
                    }
                    )
                    ;
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
                        Employees = roled.RolesEmployees.Select(x => x.Employee.FirstName + " " + x.Employee.LastName).ToList(),
                    }
                    )
                    ;
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
                return Ok("Create role succesful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
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
                _context.SaveChanges();
                return Ok("Update role successful");

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
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
                _context.SaveChanges();
                return Ok("Change roles status succesful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult SearchRole([FromBody] RoleSearchDTO roleSearchDTO)
        {
            try
            {
                var query = _context.Roles
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .AsQueryable();
                if (!string.IsNullOrEmpty(roleSearchDTO.InputText))
                {
                    query = query.Where(x => x.RoleName.ToLower().Contains(roleSearchDTO.InputText.ToLower()));
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
                        Employees = r.RolesEmployees.Select(x => x.Employee.FirstName + " " + x.Employee.LastName).ToList()
                    }
                    ).ToList();
               
                return Ok(roles);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
