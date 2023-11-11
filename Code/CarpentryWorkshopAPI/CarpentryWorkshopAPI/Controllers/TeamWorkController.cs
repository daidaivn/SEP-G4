using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class TeamWorkController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public TeamWorkController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<ActionResult> AddTeamWork(TeamWorkDTO  teamWorkDTO)
        {
            try
            {
                var team = await _context.Roles.FindAsync(teamWorkDTO.TeamId);
                var work = await _context.Pages.FindAsync(teamWorkDTO.WorkId);

                if (team == null || work == null)
                {
                    return BadRequest("Invalid Team or Work ID");
                }

                team.Pages.Add(work);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpDelete]
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
                role.Pages.Remove(page);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        
    }
}
