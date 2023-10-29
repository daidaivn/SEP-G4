using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
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
                        TeamLeaderName = (_context.Employees.FirstOrDefault(x => x.EmployeeId == t.TeamLeaderId)).FirstName + " " +
                        (_context.Employees.FirstOrDefault(x => x.EmployeeId == t.TeamLeaderId)).LastName

                    }) ;
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
                string sm = "Trưởng ca";
                string sa = "Phó ca";
                var employeerole = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(x => x.EmployeeId == eid).FirstOrDefault();
                if (employeerole != null && employeerole.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sm.ToLower())))
                {
                    return Ok("Your employee has been provided can not delete");
                }
                if (employeerole != null && employeerole.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sa.ToLower())))
                {
                    return Ok("Your employee has been provided can not delete");
                }
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
        public IActionResult GetLeaderForTeam()
        {
            try
            {
                string lead = "Trưởng ca";
                var leaderlist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(lead.ToLower())))
                    .ToList();
                var exleader = _context.EmployeeTeams
                    .Where(x => x.EndDate == null)
                    .Include(x => x.Employee)
                    .ThenInclude(e => e.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(et => et.Employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(lead.ToLower())))
                    .Select(et => et.Employee)
                    .ToList();
                var newlead = leaderlist.Except(exleader).ToList();
                var dto = _mapper.Map<List<LeadDetailDTO>>(newlead);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetSubLeaderForTeam()
        {
            try
            {
                string sublead = "Phó ca";
                var subleaderlist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sublead.ToLower())))
                    .ToList();
                var subexleader = _context.EmployeeTeams
                    .Where(x => x.EndDate == null)
                    .Include(x => x.Employee)
                    .ThenInclude(e => e.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(et => et.Employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sublead.ToLower())))
                    .Select(et => et.Employee)
                    .ToList();
                var newsublead = subleaderlist.Except(subexleader).ToList();
                var dto = _mapper.Map<List<LeadDetailDTO>>(newsublead);
                return Ok(dto);
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
                            Roles = emp.RolesEmployees
                            .OrderByDescending(re => re.Role.RoleLevel)
                            .Select(re => re.Role.RoleName)
                            .FirstOrDefault(),
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
                            Roles = emp.RolesEmployees
                            .OrderByDescending(re => re.Role.RoleLevel)
                            .Select(re => re.Role.RoleName)
                            .FirstOrDefault(),
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
                            Roles = emp.RolesEmployees
                            .OrderByDescending(re => re.Role.RoleLevel)
                            .Select(re => re.Role.RoleName)
                            .FirstOrDefault(),
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
                                  .Join(
                                            _context.Countries,
                                            employee => employee.CountryId,
                                            country => country.CountryId,
                                            (employee, country) =>
                                            {
                                                employee.Country = country;
                                                return employee;
                                            }
                                        )
                                  .ToList();
                string sm = "Trưởng ca";
                var shiftmanager = members
                 .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sm.ToLower())))
                 .OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate))
                 .FirstOrDefault();
                string sa = "Phó ca";
                var shiftassistant = members
                .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sa.ToLower())))
                .OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate))
                .FirstOrDefault();
                string st = "Nhân viên";
                var staff = members
                .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(st.ToLower())))
                .GroupBy(emp => emp.EmployeeId)
                .Select(group => group.OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate)).First())
                .ToList();
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
        [HttpPut]
        public IActionResult ChangeLeaderTwoTeam(int oldTeamId , int newTeamId)
        {
            try
            {
                var teamOld = _context.Teams.Where(te => te.TeamId == oldTeamId).FirstOrDefault();
                var teamNew = _context.Teams.Where(te => te.TeamId == newTeamId).FirstOrDefault();
                if(teamNew ==null || teamOld == null)
                {
                    return NotFound();
                }
                var oldTeam = teamOld.TeamLeaderId;
                var newTeam = teamNew.TeamLeaderId;
                if(oldTeam != null || newTeam != null)
                {
                    teamOld.TeamLeaderId = newTeam;
                    teamNew.TeamLeaderId = oldTeam;
                    _context.Update(teamNew);
                    _context.Update(teamOld);
                    var employTeamOld = _context.EmployeeTeams.Where(te => te.EmployeeId == oldTeam && te.EndDate == null);
                    employTeamOld.ToList().ForEach(em => em.EndDate = DateTime.Now);
                    var employTeamNew = _context.EmployeeTeams.Where(te => te.EmployeeId == newTeam && te.EndDate == null);
                    employTeamNew.ToList().ForEach(em => em.EndDate = DateTime.Now);
                    _context.EmployeeTeams.UpdateRange(employTeamOld);
                    _context.EmployeeTeams.UpdateRange(employTeamNew);
                    EmployeeTeam changeTeamOld = new EmployeeTeam()
                    {
                        EmployeeId = oldTeam.Value,
                        TeamId = newTeamId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                    };
                    EmployeeTeam changeTeamNew = new EmployeeTeam()
                    {
                        EmployeeId = newTeam.Value,
                        TeamId = oldTeamId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                    };
                    _context.EmployeeTeams.Add(changeTeamOld);
                    _context.EmployeeTeams.Add(changeTeamNew);
                    _context.SaveChanges();

                    return Ok("success");
                }
                else
                {
                    return BadRequest("err");
                }
                
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpPut]
        public IActionResult ChangeSubLeaderTwoTeam(int oldTeamId, int newTeamId)
        {
            try
            {
                var teamOld = _context.Teams.Where(te => te.TeamId == oldTeamId).FirstOrDefault();
                var teamNew = _context.Teams.Where(te => te.TeamId == newTeamId).FirstOrDefault();
                if (teamNew == null || teamOld == null)
                {
                    return NotFound();
                }
                var oldTeam = teamOld.TeamSubLeaderId;
                var newTeam = teamNew.TeamSubLeaderId;
                if (oldTeam != null || newTeam != null)
                {
                    teamOld.TeamSubLeaderId = newTeam;
                    teamNew.TeamSubLeaderId = oldTeam;
                    _context.Update(teamNew);
                    _context.Update(teamOld);
                    var employTeamOld = _context.EmployeeTeams.Where(te => te.EmployeeId == oldTeam && te.EndDate == null);
                    employTeamOld.ToList().ForEach(em => em.EndDate = DateTime.Now);
                    var employTeamNew = _context.EmployeeTeams.Where(te => te.EmployeeId == newTeam && te.EndDate == null);
                    employTeamNew.ToList().ForEach(em => em.EndDate = DateTime.Now);
                    _context.EmployeeTeams.UpdateRange(employTeamOld);
                    _context.EmployeeTeams.UpdateRange(employTeamNew);
                    EmployeeTeam changeTeamOld = new EmployeeTeam()
                    {
                        EmployeeId = oldTeam.Value,
                        TeamId = newTeamId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                    };
                    EmployeeTeam changeTeamNew = new EmployeeTeam()
                    {
                        EmployeeId = newTeam.Value,
                        TeamId = oldTeamId,
                        StartDate = DateTime.Now,
                        EndDate = null,
                    };
                    _context.EmployeeTeams.Add(changeTeamOld);
                    _context.EmployeeTeams.Add(changeTeamNew);
                    _context.SaveChanges();

                    return Ok("success");
                }
                else
                {
                    return BadRequest("err");
                }
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
    }
