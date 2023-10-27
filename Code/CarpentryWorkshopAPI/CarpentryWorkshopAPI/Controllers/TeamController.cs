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
                
                foreach (var item in addTeamMemberDTO.MemberIds.Distinct())
                {
                    var existingEmployeeTeam = _context.EmployeeTeams
                        .Where(et => et.EmployeeId == item && et.TeamId == addTeamMemberDTO.TeamId && et.EndDate == null)
                        .FirstOrDefault();

                    if (existingEmployeeTeam != null)
                    {
                        existingEmployeeTeam.EndDate = DateTime.Now;
                        _context.EmployeeTeams.Update(existingEmployeeTeam);
                    }

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
        public IActionResult ChangeTeam(int otid,int tid, int eid)
        {
            try
            {
                Team team = _context.Teams.FirstOrDefault(x => x.TeamId == tid);
                if (team == null)
                {
                    return NotFound();
                }
                Employee emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == eid);
                if (emp == null)
                {
                    return NotFound();
                }
                EmployeeTeam oldteam = _context.EmployeeTeams.FirstOrDefault(x => x.TeamId == otid && x.EmployeeId == eid);
                if (oldteam == null)
                {
                    return NotFound();
                }
                EmployeeTeam changeteam = new EmployeeTeam()
                {
                    EmployeeId= emp.EmployeeId,
                    TeamId= team.TeamId,
                    StartDate= DateTime.Now,
                    EndDate= null,
                };
                oldteam.EndDate = DateTime.Now;
                _context.EmployeeTeams.Update(oldteam);
                _context.EmployeeTeams.Add(changeteam);
                HistoryChangeTeam history = new HistoryChangeTeam()
                {
                    TeamId= team.TeamId,
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
        [HttpGet("{teamId}/members")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetTeamMembers(int teamId)
        {
            try
            {
                var team = await _context.Teams
                    .Include(t => t.EmployeeTeams)
                    .ThenInclude(et => et.Employee)
                    .ThenInclude(et => et.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .FirstOrDefaultAsync(t => t.TeamId == teamId);
                if (team == null)
                {
                    return NotFound();
                }
                var members = team.EmployeeTeams
                                  .Where(et => et.EndDate == null)
                                  .Select(et => et.Employee)
                                  .ToList();
                string sm = "Trưởng ca";
                var shiftmanager = members
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sm.ToLower()))).FirstOrDefault();
                string sa = "Phó ca";
                var shiftassistant = members
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sa.ToLower()))).FirstOrDefault();
                string st = "Nhân viên";
                var staff = members
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
