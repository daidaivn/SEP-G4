using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarpentryWorkshopAPI.Controllers
{

    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class AccessCotroller : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public AccessCotroller(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AccessDTO>>> GetRolesWithPages()
        {
            var pageRoleList = await _context.Pages
                .Include(page => page.Roles)
                .SelectMany(page => page.Roles, (page, role) => new AccessDTO
                {
                    PageId = page.PageId,
                    RoleId = role.RoleId
                })
                .ToListAsync();


            return pageRoleList;
        }
        // GET api/<AccessCotroller>/5
        [HttpPost]
        public async Task<ActionResult> AddRolePage(AccessDTO accessDTO)
        {
            try
            {
                var role = await _context.Roles.FindAsync(accessDTO.RoleId);
                var page = await _context.Pages.FindAsync(accessDTO.PageId);
                if (role == null || page == null)
                {
                    return BadRequest("Invalid Role or Page ID");
                }

                role.Pages.Add(page);
                await _context.SaveChangesAsync();
                return Ok("sucess");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpDelete("{roleId}/{pageId}")]
        public async Task<ActionResult> DeleteRolePage(int roleId, int pageId)
        {
            try
            {
                var role = await _context.Roles.Include(r => r.Pages).FirstOrDefaultAsync(r => r.RoleId == roleId);
                if (role == null)
                {
                    return NotFound("Role not found");
                }
                var page = role.Pages.FirstOrDefault(p => p.PageId == pageId);
                if (page == null)
                {
                    return NotFound("Page not found in Role");
                }
                string admin = "Admin";
                if (role.RoleName.ToLower().Equals(admin.ToLower())) 
                {
                    return BadRequest("Không được bỏ chọn cho chức vụ này");
                }
                else
                {
                    role.Pages.Remove(page);
                    await _context.SaveChangesAsync();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
