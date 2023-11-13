using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.ProjectModel;
using System.Data;
using System.Security.Cryptography.Xml;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    [Authorize(Roles = "ListGroup")]
    public class TeamController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public TeamController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult GetAllTeams(int employeeid)
        {
            try
            {
                var employeeDepartment = _context.RolesEmployees
                   .Where(e => e.EmployeeId == employeeid && e.EndDate == null)
                   .FirstOrDefault();

                var teams = _context.Teams
                    .Include(t => t.TeamWorks)
                        .ThenInclude(tw => tw.Work)
                            .ThenInclude(w => w.WorkArea)
                    .Include(t => t.EmployeeTeams)
                        .ThenInclude(et => et.Employee)
                            .ThenInclude(e => e.RolesEmployees)
                    .Where(t => t.EmployeeTeams.Any(et => et.Employee.RolesEmployees.Any(re => re.DepartmentId == employeeDepartment.DepartmentId)))
                    .Select(t => new TeamListDTO
                    {
                        TeamId = t.TeamId,
                        TeamName = t.TeamName,
                        NumberOfTeamMember = t.EmployeeTeams
                            .Where(et => et.EndDate == null)
                            .GroupBy(et => new { et.EmployeeId, et.TeamId })
                            .Count(),
                        TeamLeaderName = _context.Employees
                            .Where(e => e.EmployeeId == t.TeamLeaderId)
                            .Select(e => e.FirstName + " " + e.LastName)
                            .FirstOrDefault() ?? string.Empty
                    })
                    .ToList();

                if (!teams.Any())
                {
                    return NotFound();
                }

                return Ok(teams);
            }
            catch (Exception ex)
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
        [HttpPost]
        public IActionResult DeleteTeamMember(int employeeid, int teamid)
        {
            try
            {
                var employeerole = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(x => x.EmployeeId == employeeid).FirstOrDefault();
                var dtm = _context.EmployeeTeams
                    .Where(x => x.EmployeeId == employeeid && x.TeamId == teamid)
                    .OrderByDescending(x => x.StartDate)
                    .FirstOrDefault();
                if (dtm == null)
                {
                    return NotFound();
                }
                dtm.EndDate = DateTime.Now;
                _context.EmployeeTeams.Update(dtm);
                _context.SaveChanges();
                return Ok("Delete teammenber successful");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult AddTeam(string name, int teamleaderid, int teamsubleaderid)
        {
            try
            {
                Team newteam = new Team()
                {
                    TeamName = name,
                    TeamLeaderId = teamleaderid,
                    TeamSubLeaderId = teamsubleaderid,
                };
                _context.Teams.Add(newteam);
                _context.SaveChanges();
                EmployeeTeam lead = new EmployeeTeam()
                {
                    EmployeeId = teamleaderid,
                    TeamId = newteam.TeamId,
                    StartDate = DateTime.Now,
                    EndDate = null,
                };
                _context.EmployeeTeams.Add(lead);
                EmployeeTeam sublead = new EmployeeTeam()
                {
                    EmployeeId = teamsubleaderid,
                    TeamId = newteam.TeamId,
                    StartDate = DateTime.Now,
                    EndDate = null,
                };
                _context.EmployeeTeams.Add(sublead);
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
        [HttpPost]
        public IActionResult GetLeaderForTeam(int leadId)
        {
            try
            {
                string leade = "Nhóm trưởng";
                var leader = _context.RolesEmployees
                    .Include(x => x.Role)
                    .Include(x => x.Department)
                    .Where(x => x.EmployeeId == leadId && x.Role.RoleName.ToLower().Equals(leade.ToLower()))
                    .FirstOrDefault();

                string lead = "Trưởng ca";
                var leaderlist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Department)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(lead.ToLower()))
                    && emp.RolesEmployees.Any(re => re.Department.DepartmentId == leader.DepartmentId))
                    .ToList();
                var exleader = _context.EmployeeTeams
                    .Where(x => x.EndDate == null)
                    .Include(x => x.Employee)
                    .ThenInclude(e => e.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(et => et.Employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(lead.ToLower()))
                    && et.Employee.RolesEmployees.Any(re => re.Department.DepartmentId == leader.DepartmentId))
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
        [HttpPost]
        public IActionResult GetSubLeaderForTeam(int leadId)
        {
            try
            {
                string leade = "Nhóm trưởng";
                var leader = _context.RolesEmployees
                    .Include(x => x.Role)
                    .Include(x => x.Department)
                    .Where(x => x.EmployeeId == leadId && x.Role.RoleName.ToLower().Equals(leade.ToLower()))
                    .FirstOrDefault();
                string sublead = "Phó ca";
                var subleaderlist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sublead.ToLower()))
                    && emp.RolesEmployees.Any(re => re.Department.DepartmentId == leader.DepartmentId))
                    .ToList();
                var subexleader = _context.EmployeeTeams
                    .Where(x => x.EndDate == null)
                    .Include(x => x.Employee)
                    .ThenInclude(e => e.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(et => et.Employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sublead.ToLower()))
                    && et.Employee.RolesEmployees.Any(re => re.Department.DepartmentId == leader.DepartmentId))
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
            }
            catch (Exception ex)
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
        public IActionResult GetStaffs(int leadId)
        {
            try
            {
                string leade = "Nhóm trưởng";
                var leader = _context.RolesEmployees
                    .Include(x => x.Role)
                    .Include(x => x.Department)
                    .Where(x => x.EmployeeId == leadId && x.Role.RoleName.ToLower().Equals(leade.ToLower()))
                    .FirstOrDefault();

                string rolename = "Nhân viên";
                var elist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(x => x.Role)
                    .ToList();
                if (elist == null)
                {
                    return NotFound();
                }
                var sm = elist.Where(employee =>
                                employee.RolesEmployees != null && employee.RolesEmployees.Any(re =>
                                    re.Role != null &&
                                    re.Role.RoleName.ToLower().Equals(rolename.ToLower())
                                ) &&
                                employee.RolesEmployees.Any(re =>
                                    re.Department != null && re.Department.DepartmentId == leader?.DepartmentId
                                ) &&
                                !_context.EmployeeTeams.Any(et => et.EmployeeId == employee.EmployeeId && et.EndDate == null)
                            )
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
        public IActionResult GetAvailableTeam(int teamid)
        {
            try
            {
                var availableTeams = _context.Teams
                    .Where(x => x.TeamId != teamid)
                    .Include(x => x.TeamWorks)
                        .ThenInclude(tw => tw.Work)
                        .ThenInclude(w => w.WorkArea)
                    .Include(x => x.EmployeeTeams)
                        .ThenInclude(et => et.Employee)
                    .Select(t => new TeamListDTO
                    {
                        TeamId = t.TeamId,
                        TeamName = t.TeamName,
                        NumberOfTeamMember = t.EmployeeTeams.Count(),
                    })
                    .ToList();

                if (availableTeams == null)
                {
                    return NotFound();
                }

                return Ok(availableTeams);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult ChangeTeamStaff(int teamid, int employeeid)
        {
            try
            {
                Team team = _context.Teams.FirstOrDefault(x => x.TeamId == teamid);
                if (team == null)
                {
                    return NotFound();
                }
                Employee emp = _context.Employees.FirstOrDefault(x => x.EmployeeId == employeeid);
                if (emp == null)
                {
                    return NotFound();
                }
                List<EmployeeTeam> oldteam = _context.EmployeeTeams.Where(x => x.EmployeeId == employeeid).ToList();
                if (oldteam == null)
                {
                    return NotFound();
                }
                foreach (var item in oldteam)
                {
                    if (item.EndDate == null)
                    {
                        item.EndDate = DateTime.Now;
                        _context.EmployeeTeams.Update(item);
                    }
                }
                EmployeeTeam changeteam = new EmployeeTeam()
                {
                    EmployeeId = emp.EmployeeId,
                    TeamId = team.TeamId,
                    StartDate = DateTime.Now,
                    EndDate = null,
                };


                _context.EmployeeTeams.Add(changeteam);
                HistoryChangeTeam history = new HistoryChangeTeam()
                {
                    TeamId = team.TeamId,
                    Action = "Add new member",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.HistoryChangeTeams.Add(history);
                _context.SaveChanges();
                return Ok("Change member for team successful");
            }
            catch (Exception ex)
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

                var shiftmanager = _context.Employees.FirstOrDefault(x => x.EmployeeId == team.TeamLeaderId);
                //.Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sm.ToLower())))
                //.OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate))
                //.FirstOrDefault();
                //string sa = "Phó ca";
                var shiftassistant = _context.Employees.FirstOrDefault(x => x.EmployeeId == team.TeamSubLeaderId);
                //.Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sa.ToLower())))
                //.OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate))
                //.FirstOrDefault();
                string st = "Nhân viên";
                var staff = members
                .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(st.ToLower())))
                .GroupBy(emp => emp.EmployeeId)
                .Select(group => group.OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate)).First())
                .ToList();
                var teammem = new
                {
                    TeamName = team.TeamName,
                    ShiftManager = _mapper.Map<TeamMemberDTO>(shiftmanager),
                    ShiftAssistant = _mapper.Map<TeamMemberDTO>(shiftassistant),
                    Staff = _mapper.Map<List<TeamMemberDTO>>(staff)
                };
                return Ok(teammem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public IActionResult SearchTeam(string input)
        {
            try
            {
                var query = _context.Teams
                    .Include(x => x.EmployeeTeams)
                    .ThenInclude(et => et.Employee)
                    .ToList()
                    .AsQueryable();
                if (!string.IsNullOrEmpty(input))
                {
                    string work = input.ToLower();
                    query = query.Where(x =>
                        x.TeamName.ToLower().Contains(input) ||
                        x.EmployeeTeams.Any(et =>
                            (et.Employee.FirstName + et.Employee.LastName).ToLower().Contains(input)
                        )
                    );
                }
                var dto = query.Select(t => new TeamListDTO
                {
                    TeamId = t.TeamId,
                    TeamName = t.TeamName,
                    NumberOfTeamMember = t.EmployeeTeams.Where(x => x.EndDate == null).Count(),
                    TeamLeaderName = (_context.Employees.FirstOrDefault(x => x.EmployeeId == t.TeamLeaderId)).FirstName + " " +
                        (_context.Employees.FirstOrDefault(x => x.EmployeeId == t.TeamLeaderId)).LastName
                });
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public IActionResult ChangeLeaderTwoTeam(int oldTeamId, int newTeamId)
        {
            try
            {
                var teamOld = _context.Teams.Where(te => te.TeamId == oldTeamId).FirstOrDefault();
                var teamNew = _context.Teams.Where(te => te.TeamId == newTeamId).FirstOrDefault();
                if (teamNew == null || teamOld == null)
                {
                    return NotFound();
                }
                var oldTeam = teamOld.TeamLeaderId;
                var newTeam = teamNew.TeamLeaderId;
                if (oldTeam != null || newTeam != null)
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
            catch (Exception ex)
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
        [HttpPost]
        public IActionResult ChangeTeamName(string newName, int teamid)
        {
            try
            {
                var exteam = _context.Teams.FirstOrDefault(x => x.TeamId == teamid);
                if (exteam == null)
                {
                    return NotFound();
                }
                exteam.TeamName = newName;
                _context.SaveChanges();
                return Ok("Change team name successful");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTeamForSchedule(int teamleaderid)
        {
            try
            {
                var employeeDepartment = _context.RolesEmployees
                   .Where(e => e.EmployeeId == teamleaderid && e.EndDate == null)
                   .FirstOrDefault();
                var currentDateTime = DateTime.Now;
                var result = new List<Object>();
                var teams = await _context.Teams
                    .Include(t => t.TeamWorks)
                        .ThenInclude(tw => tw.Work)
                    .Include(t => t.EmployeeTeams)
                        .ThenInclude(et => et.Employee)
                        .ThenInclude(e => e.RolesEmployees)
                    .Include(t => t.WorkSchedules)
                        .ThenInclude(wc => wc.ShiftType)
                    .Where(t => t.EmployeeTeams.Any(et => et.Employee.RolesEmployees.Any(re => re.DepartmentId == employeeDepartment.DepartmentId)))
                    .ToListAsync();

                foreach (var team in teams)
                {
                    var wId = team.TeamWorks.FirstOrDefault(tw => tw.Work != null && tw.Work.StartDate <= currentDateTime && currentDateTime <= tw.Work.EndDate)?.Work.WorkId;
                    if (wId != null)
                    {
                        var work = await _context.Works.Where(w => w.WorkId == wId)
                            .Include(w => w.UniCost)
                            .Include(w => w.WorkArea)
                            .Include(w => w.TeamWorks)
                            .FirstOrDefaultAsync();

                        if (work != null)
                        {
                            var teamProduct = work.TeamWorks.Sum(tw => tw.TotalProduct ?? 0);
                            var teamLeaderName = team.TeamLeaderId.HasValue ?
                                _context.Employees.Where(x => x.EmployeeId == team.TeamLeaderId.Value)
                                    .Select(x => x.FirstName + " " + x.LastName)
                                    .FirstOrDefault() : string.Empty;

                            result.Add(new TeamForScheduleDTO
                            {
                                TeamId = team.TeamId,
                                TeamName = team.TeamName,
                                ShiftTypeName = team.WorkSchedules.FirstOrDefault()?.ShiftType?.TypeName ?? string.Empty,
                                TeamLeaderName = teamLeaderName,
                                NumberOfMember = team.EmployeeTeams.Count(et => et.EndDate == null),
                                WorkStatus = teamProduct < work.TotalProduct ? true : false,
                            });
                        }
                    }
                    else
                    {
                        var teamLeader = team.TeamLeaderId.HasValue ?
                                _context.Employees.Where(x => x.EmployeeId == team.TeamLeaderId.Value)
                                    .Select(x => x.FirstName + " " + x.LastName)
                                    .FirstOrDefault() : string.Empty;
                        result.Add(new TeamForScheduleDTO
                        {
                            TeamId = team.TeamId,
                            TeamName = team.TeamName,
                            ShiftTypeName = team.WorkSchedules.FirstOrDefault()?.ShiftType?.TypeName ?? string.Empty,
                            TeamLeaderName = teamLeader,
                            NumberOfMember = team.EmployeeTeams.Count(et => et.EndDate == null),
                            WorkStatus = "Chưa có",
                        });
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error");
            }
        }

    }
}