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
                var teams = _context.Teams.ToList();
                if (teams == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<TeamListDTO>>(teams);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpPost]
        public IActionResult CreateAndUpdateTeam([FromBody] CreateTeamDTO createTeamDTO)
        {
            try
            {
                if (createTeamDTO.TeamId == 0)
                {
                    var newteam = _mapper.Map<Team>(createTeamDTO);
                    if (newteam == null)
                    {
                        return NotFound();
                    }
                    HistoryChangeTeam history = new HistoryChangeTeam
                    {
                        TeamId = newteam.TeamId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeTeams.Add(history);
                    _context.Teams.Add(newteam);
                    _context.SaveChanges();
                    return Ok("Create team succesful");
                }
                else
                {
                    var updateteam = _mapper.Map<Team>(createTeamDTO);
                    if (updateteam == null)
                    {
                        return NotFound();
                    }
                    HistoryChangeTeam history = new HistoryChangeTeam
                    {
                        TeamId = updateteam.TeamId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeTeams.Add(history);
                    _context.Teams.Update(updateteam);
                    _context.SaveChanges();
                    return Ok("Update team succesful");
                }
            }catch(Exception ex)
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
                    .Where(x => x.TeamId == teamid)
                    .ToList();
                if (teammebers == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<EmployeeListDTO>>(teammebers);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
