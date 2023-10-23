using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;

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
        public IActionResult GetShiftManagers()
        {
            try
            {
                string rolename = "Trưởng ca";
                var elist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(x => x.Role)
                    .ToList();
                if (elist == null)
                {
                    return NotFound();
                }
                var sm = elist.Where(employee => employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(rolename.ToLower())))
                        .Select(emp => new EmployeeListDTO
                        {
                            EmployeeID = emp.EmployeeId,
                            Image = emp.Image,
                            FullName = $"{emp.FirstName} {emp.LastName}",
                            Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                            PhoneNumber = emp.PhoneNumber,
                            Roles = emp.RolesEmployees.Select(re => re.Role.RoleName).ToList(),
                            Status = emp.Status,
                        });
                return Ok(sm);          
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetShiftAssistants()
        {
            try
            {
                string rolename = "Phó ca";
                var elist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(x => x.Role)
                    .ToList();
                if (elist == null)
                {
                    return NotFound();
                }
                var sm = elist.Where(employee => employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(rolename.ToLower())))
                        .Select(emp => new EmployeeListDTO
                        {
                            EmployeeID = emp.EmployeeId,
                            Image = emp.Image,
                            FullName = $"{emp.FirstName} {emp.LastName}",
                            Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                            PhoneNumber = emp.PhoneNumber,
                            Roles = emp.RolesEmployees.Select(re => re.Role.RoleName).ToList(),
                            Status = emp.Status,
                        });
                return Ok(sm);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetStaffs()
        {
            try
            {
                string rolename = "Nhân viên";
                var elist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(x => x.Role)
                    .ToList();
                if (elist == null)
                {
                    return NotFound();
                }
                var sm = elist.Where(employee => employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(rolename.ToLower())))
                        .Select(emp => new EmployeeListDTO
                        {
                            EmployeeID = emp.EmployeeId,
                            Image = emp.Image,
                            FullName = $"{emp.FirstName} {emp.LastName}",
                            Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                            PhoneNumber = emp.PhoneNumber,
                            Roles = emp.RolesEmployees.Select(re => re.Role.RoleName).ToList(),
                            Status = emp.Status,
                        });
                return Ok(sm);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetAvailableTeam(int tid)
        {
            try
            {
                var availbableteam = _context.Teams
                    .Where(x => x.TeamId != tid)
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
                if (availbableteam ==  null)
                {
                    return NotFound();
                }       
                return Ok(availbableteam);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult ChangeTeam(int tid, int eid)
        {
            try
            {
                EmployeeTeam changeteam = new EmployeeTeam()
                {
                    EmployeeId= tid,
                    TeamId= eid,
                    StartDate= DateTime.Now,
                    EndDate= null,
                };
                _context.EmployeeTeams.Add(changeteam);
                HistoryChangeTeam history = new HistoryChangeTeam()
                {
                    TeamId= tid,
                    Action = "Add new member",
                    ActionDate= DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.HistoryChangeTeams.Add(history);
                _context.SaveChanges();
                return Ok("Change member for team successful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetTeamDetail(int teamid)
        {
            try
            {
                var teammembers = _context.EmployeeTeams
                    .Where(x => x.TeamId == teamid)
                    .Include(x => x.Employee)
                    .ThenInclude(et => et.RolesEmployees)
                    .ThenInclude(rolem => rolem.Role)
                    .ToList();                   
                if (teammembers == null)
                {
                    return NotFound();
                }
                string sm = "Trưởng ca";
                var shiftmanager = teammembers.Select(x => x.Employee)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sm.ToLower()))).FirstOrDefault();
                string sa = "Phó ca";
                var shiftassistant = teammembers.Select(x => x.Employee)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sa.ToLower()))).FirstOrDefault();
                string st = "Nhân viên";
                var staff = teammembers.Select(x => x.Employee)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(st.ToLower()))).ToList();
                var teammem = new
                {
                    ShiftManager = _mapper.Map<TeamMemberDTO>(shiftmanager),
                    ShiftAssistant = _mapper.Map<TeamMemberDTO>(shiftassistant),
                    Staff = _mapper.Map<List<TeamMemberDTO>>(staff)
                };
                return Ok(teammem);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
