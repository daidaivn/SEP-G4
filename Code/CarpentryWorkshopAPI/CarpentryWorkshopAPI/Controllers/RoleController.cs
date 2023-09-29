using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
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
                var rolelist = _context.Roles.ToList();
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
                var role = _context.Roles.FirstOrDefault(x => x.RoleId== rid);
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
                var query = _context.Roles.AsQueryable();
                if (roleSearchDTO.RoleId != 0)
                {
                    query = query.Where(x => x.RoleId == roleSearchDTO.RoleId);
                }
                if (!string.IsNullOrEmpty(roleSearchDTO.RoleName))
                {
                    query = query.Where(x => x.RoleName.ToLower().Equals(roleSearchDTO.RoleName.ToLower()));
                }
                if (roleSearchDTO.Status == true)
                {
                    query = query.Where(x => x.Status == true);
                }
                else
                {
                    query = query.Where(x => x.Status == false);
                }
                var roles = _mapper.Map<List<Role>, List<RoleSearchDTO>>(query.ToList());
                if (roles == null)
                {
                    return NotFound();
                }
                return Ok(roles);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
