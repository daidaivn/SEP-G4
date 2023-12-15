using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
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
                    .Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == employeeid && re.Role.RoleName.Contains("Trưởng phòng") && re.EndDate == null)
                    .Select(re => new
                    {
                        DepartmentId = re.DepartmentId,
                        DepartmentName = re.Department.DepartmentName,
                    }).FirstOrDefault();
                if (employeeDepartment == null)
                {
                    return BadRequest("Không có chức vụ trưởng phòng");
                }
                var teams = _context.Teams
                    .Include(t => t.TeamWorks)
                        .ThenInclude(tw => tw.Work)
                            .ThenInclude(w => w.WorkArea)
                    .Include(t => t.EmployeeTeams)
                        .ThenInclude(et => et.Employee)
                            .ThenInclude(e => e.RolesEmployees)
                    .Where(t => t.EmployeeTeams.Any(et => et.Employee.RolesEmployees.Any(re => re.DepartmentId == employeeDepartment.DepartmentId && re.EndDate == null) && et.EndDate == null))
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
                return Ok(teams);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                return Ok("Thêm thành viên nhóm thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi thêm thành viên nhóm");
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
                return Ok("Xóa thành viên nhóm thành công");

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi xóa thành viên nhóm");
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
                return Ok("Tạo nhóm mới thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi tạo nhóm mới");
            }
        }
        [HttpPost]
        public IActionResult GetLeaderForTeam(int leadId)
        {
            try
            {
                string leade = "Trưởng phòng";
                var leader = _context.RolesEmployees
                    .Include(x => x.Role)
                    .Include(x => x.Department)
                    .Where(x => x.EmployeeId == leadId && x.Role.RoleName.ToLower().Contains(leade.ToLower()))
                    .FirstOrDefault();

                string lead = "Trưởng ca sản xuất";
                var leaderlist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Department)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(lead.ToLower()) && re.Department.DepartmentId == leader.DepartmentId && re.EndDate == null))
                    .ToList();
                var exleader = _context.EmployeeTeams
                    .Where(x => x.EndDate == null)
                    .Include(x => x.Employee)
                    .ThenInclude(e => e.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(et => et.Employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(lead.ToLower()) && re.Department.DepartmentId == leader.DepartmentId && re.EndDate == null) && et.EndDate == null)
                    .Select(et => et.Employee)
                    .ToList();
                var newlead = leaderlist.Except(exleader).ToList();
                var dto = _mapper.Map<List<LeadDetailDTO>>(newlead);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult GetSubLeaderForTeam(int leadId)
        {
            try
            {
                string leade = "Trưởng phòng";
                var leader = _context.RolesEmployees
                    .Include(x => x.Role)
                    .Include(x => x.Department)
                    .Where(x => x.EmployeeId == leadId && x.Role.RoleName.ToLower().Contains(leade.ToLower()))
                    .FirstOrDefault();
                string sublead = "Phó ca sản xuất";
                var subleaderlist = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sublead.ToLower()) && re.Department.DepartmentId == leader.DepartmentId && re.EndDate == null))
                    .ToList();
                var subexleader = _context.EmployeeTeams
                    .Where(x => x.EndDate == null)
                    .Include(x => x.Employee)
                    .ThenInclude(e => e.RolesEmployees)
                    .ThenInclude(re => re.Role)
                    .Where(et => et.Employee.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sublead.ToLower()) && re.Department.DepartmentId == leader.DepartmentId && re.EndDate == null) && et.EndDate == null)
                    .Select(et => et.Employee)
                    .ToList();
                var newsublead = subleaderlist.Except(subexleader).ToList();
                var dto = _mapper.Map<List<LeadDetailDTO>>(newsublead);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                            FullName = $"{emp.LastName} {emp.FirstName}",
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
                return BadRequest("Lỗi dữ liệu");
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
                            FullName = $"{emp.LastName} {emp.FirstName}",
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
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetStaffs(int leadId)
        {
            try
            {
                string leade = "Trưởng phòng";
                var leader = _context.RolesEmployees
                    .Include(x => x.Role)
                    .Include(x => x.Department)
                    .Where(x => x.EmployeeId == leadId && x.Role.RoleName.ToLower().Contains(leade.ToLower()))
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
                            FullName = $"{emp.LastName} {emp.FirstName}",
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
                return BadRequest("Lỗi dữ liệu");
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
                return BadRequest("Lỗi dữ liệu");
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
                return Ok("Đổi thành viên nhóm thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi đổi thành viên nhóm");
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

                var shiftmanager = await _context.Employees
                    .Include(x => x.EmployeeTeams)
                    .FirstOrDefaultAsync(x => x.EmployeeId == team.TeamLeaderId && x.EmployeeTeams.Any(et => et.EndDate == null));
                //.Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sm.ToLower())))
                //.OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate))
                //.FirstOrDefault();
                //string sa = "Phó ca";
                var shiftassistant = _context.Employees
                    .Include(x => x.EmployeeTeams)
                    .FirstOrDefault(x => x.EmployeeId == team.TeamSubLeaderId && x.EmployeeTeams.Any(et => et.EndDate == null));
                //.Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(sa.ToLower())))
                //.OrderByDescending(emp => emp.EmployeeTeams.Max(et => et.StartDate))
                //.FirstOrDefault();
                string st = "Nhân viên";
                var staff = members
                .Where(emp => emp.RolesEmployees.Any(re => re.Role.RoleName.ToLower().Equals(st.ToLower()))
                && emp.EmployeeId != team.TeamLeaderId && emp.EmployeeId != team.TeamSubLeaderId)
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
                return BadRequest("Lỗi dữ liệu");
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
                return BadRequest("Lỗi dữ liệu");
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

                    return Ok("Chuyển trưởng ca thành công");
                }
                else
                {
                    return BadRequest("Lỗi chuyển trưởng ca");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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

                    return Ok("Chuyển phó ca thành công");
                }
                else
                {
                    return BadRequest("Lỗi chuyển phó ca");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                return Ok("Đổi tên nhóm thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                            ShiftTypeName = "Chưa có",
                            TeamLeaderName = teamLeader,
                            NumberOfMember = team.EmployeeTeams.Count(et => et.EndDate == null),
                            WorkStatus = false,
                        });
                    }
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(409, "Lỗi máy chủ");
            }
        }
        [HttpPost]
        public async Task<ActionResult<IEnumerable<object>>> GetDataForSchedule([FromBody] ScheduleDataInputDTO scheduleDataInputDTO)
        {
            try
            {
                if (scheduleDataInputDTO == null)
                {
                    return BadRequest("Không tìm thấy dữ liệu");
                }
                string[] split = scheduleDataInputDTO.Date.Split('-');
                string start = split[0];
                string end = split[1];
                var result = new List<object>();
                var department = _context.RolesEmployees.Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == scheduleDataInputDTO.LeaderId && re.Role.RoleName.Contains("Trưởng phòng") && re.EndDate == null).Select(re => new
                {
                    DepartmentId = re.DepartmentId,
                    DepartmentName = re.Department.DepartmentName,
                }).FirstOrDefault();
                if (department == null)
                {
                    return NotFound("Không có phòng ban này");
                }
                string searchTerm = "";
                if (!string.IsNullOrEmpty(scheduleDataInputDTO.InputText))
                {
                    searchTerm = scheduleDataInputDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                }
                var teams = await _context.Teams
                    .Include(t => t.EmployeeTeams)
                        .ThenInclude(et => et.Employee)
                        .ThenInclude(e => e.RolesEmployees)
                    .Include(t => t.WorkSchedules)
                        .ThenInclude(wc => wc.ShiftType)
                    .Where(t => t.EmployeeTeams.Any(et => et.Employee.RolesEmployees.Any(re => re.DepartmentId == department.DepartmentId && re.EndDate == null) && et.EndDate == null))
                    .ToListAsync();
                if (teams.Count < 0)
                {
                    return BadRequest("Không tìm thấy dữ liệu");
                }

                var teamSearchs = teams.Where(t => t.TeamName.ToLower().Normalize(NormalizationForm.FormD).Contains(searchTerm));

                foreach (Team team in teamSearchs)
                {
                    var day = new List<object>();
                    var teamworks = _context.TeamWorks.Where(tw => tw.TeamId == team.TeamId).ToList();
                    var endDate = DateTime.ParseExact(end + "/" + scheduleDataInputDTO.Year, "dd/MM/yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                    var startDate = DateTime.ParseExact(start + "/" + scheduleDataInputDTO.Year, "dd/MM/yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture);
                    var timeShift = team.WorkSchedules.Where(ws => ws.EndDate == null).Select(t => new
                    {
                        TimeIn = t.ShiftType.StartTime,
                        Timeout = t.ShiftType.EndTime,
                    }).FirstOrDefault();
                    while (startDate <= endDate)
                    {
                        string status;
                        if (startDate.Date < DateTime.Now.Date)
                        {
                            status = teamworks.Any(tw => tw.Date.Value.Date == startDate.Date) ? "end" : (string)null;
                        }
                        else if (startDate.Date == DateTime.Now.Date)
                        {
                            status = (timeShift == null || DateTime.Now.TimeOfDay > timeShift.TimeIn) ? "end" : (teamworks.Any(tw => tw.Date.Value.Date == startDate.Date) ? "yes" : "no");
                        }
                        else
                        {
                            status = teamworks.Any(tw => tw.Date.Value.Date == startDate.Date) ? "yes" : "no";
                        }

                        day.Add(new
                        {
                            Date = startDate.ToString("dd'-'MM'-'yyyy"),
                            Status = status,
                            WorkId = teamworks.Where(tw => tw.Date.Value.Date == startDate.Date).Select(tw => tw.WorkId).FirstOrDefault()
                        });
                        startDate = startDate.AddDays(1);
                    }
                    var shiftType = await _context.WorkSchedules
                        .Where(ws => ws.TeamId == team.TeamId && ws.StartDate.Value.Date <= startDate.Date && ws.EndDate.Value.Date >= endDate.Date)
                        .Select(ws => new ShiftTypeDTO
                        {
                            ShiftTypeId = ws.ShiftTypeId,
                            TypeName = ws.ShiftType.TypeName,
                        })
                        .Distinct()
                        .ToListAsync();
                    result.Add(new
                    {
                        ShiftType = shiftType,
                        TeamId = team.TeamId,
                        TeamName = team.TeamName,
                        NumberMember = team.EmployeeTeams.Where(et => et.EndDate == null).Select(et => et.EmployeeId).Distinct().Count(),
                        Year = DateTime.Now.Year,
                        DataForWork = day,
                    });

                }

                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(409, "Lỗi máy chủ");
            }
        }
        [HttpPost]
        public IActionResult CancelTeam(int teamId)
        {
            try
            {
                var team = _context.EmployeeTeams.Where(em=>em.TeamId == teamId).ToList();
                if(team.Count() <= 0)
                {
                    return BadRequest("không thể tìm thấy nhóm");
                }
                team.ForEach(ws => ws.EndDate = DateTime.Now);
                _context.EmployeeTeams.UpdateRange(team);
                _context.SaveChanges();
                return Ok("Xóa nhóm thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(409, "Lỗi máy chủ");
            }
        }

    }
}