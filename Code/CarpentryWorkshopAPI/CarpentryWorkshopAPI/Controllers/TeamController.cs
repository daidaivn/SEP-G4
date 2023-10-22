using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class TeamController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public TeamController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllTeams()
        {
            try
            {
                var teams = _context.Teams
                    .Include(x => x.Works)
                    .ThenInclude(w => w.WorkArea)
                    .Include(x => x.EmployeeTeams)
                    .ThenInclude(tl => tl.Employee)
                    .Select(t => new TeamListDTO
                    {
                        TeamId = t.TeamId,
                        TeamName = t.TeamName,
                        NumberOfTeamMember = t.EmployeeTeams.Count(),
                    });
                if (teams == null)
                {
                    return NotFound();
                }
               
                return Ok(teams);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpPost]
        public IActionResult AddTeamMember([FromBody] AddTeamMemberDTO addTeamMemberDTO)
        {
            try
            {
                foreach (var item in addTeamMemberDTO.MemberIds)
                {
                    EmployeeTeam newtm = new EmployeeTeam()
                    {
                        EmployeeId = item,
                        TeamId = addTeamMemberDTO.TeamId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                    };
                    _context.EmployeeTeams.Add(newtm);
                  
                }
                _context.SaveChanges();
                return Ok("Add new team member successful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{eid}/{tid}")]
        public IActionResult DeleteTeamMember(int eid, int tid)
        {
            try
            {
                var dtm = _context.EmployeeTeams
                    .FirstOrDefault(x => x.EmployeeId == eid && x.TeamId == tid);
                if (dtm == null)
                {
                    return NotFound();
                }
                _context.EmployeeTeams.Remove(dtm);
                _context.SaveChanges();
                return Ok("Delete teammenber successful");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult AddTeam(string name)
        {
            try
            {
                Team newteam = new Team()
                {
                    TeamName = name,
                };
                _context.Teams.Add(newteam);
                _context.SaveChanges();
                HistoryChangeTeam history = new HistoryChangeTeam()
                {
                    TeamId = newteam.TeamId,
                    Action = "Create",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.HistoryChangeTeams.Add(history);
                _context.SaveChanges();
                return Ok("Create team successful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
        [HttpGet]
        public IActionResult GetAllTeamMember(int teamid)
        {
            try
            {
                var teammebers = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(x => x.TeamId == teamid)
                    .Select(tm => new TeamMemberDTO
                    {
                        EmployeeId = tm.EmployeeId,
                        FullName = tm.FirstName + " " + tm.LastName,
                        RoleName = tm.RolesEmployees.Select(x => x.Role.RoleName).ToList()
                    }) ;
                if (teammebers == null)
                {
                    return NotFound();
                }
                
                return Ok(teammebers);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
