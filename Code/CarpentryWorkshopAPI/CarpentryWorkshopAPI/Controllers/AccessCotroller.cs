using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarpentryWorkshopAPI.Controllers
{

    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class AccessCotroller : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public AccessCotroller(SEPG4CWMSContext context, IMapper mapper)
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
                    return BadRequest("Mã chức vụ hoặc mã trang không hợp lệ.");
                }

                role.Pages.Add(page);
                await _context.SaveChangesAsync();
                return Ok("Tạo thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
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
                    return NotFound("Không tìm thấy chức vụ");
                }
                var page = role.Pages.FirstOrDefault(p => p.PageId == pageId);
                if (page == null)
                {
                    return NotFound("Chức vụ này không có quyền ở trang này");
                }
                string admin = "Decentralization";
                if (page.PageName.ToLower().Equals(admin.ToLower())) 
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
                return StatusCode(500, "Lỗi máy chủ");

            }

        }
    }
}
