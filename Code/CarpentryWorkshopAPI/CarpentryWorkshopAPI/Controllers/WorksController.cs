﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.WebSockets;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class WorksController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;

        public WorksController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllWorks(int employeeId)
        {
            var department = _context.RolesEmployees.Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == employeeId && re.Role.RoleName == "Nhóm trưởng" && re.EndDate == null).Select(re => new
            {
                DepartmentId =  re.DepartmentId,
                DepartmentName = re.Department.DepartmentName,
            }).FirstOrDefault();
            if(department == null)
            {
                return NotFound("notHaveDepartment");
            }
            var work = _context.Works.Include(w=>w.UniCost).Include(w=>w.WorkArea).Include(w=>w.TeamWorks).ThenInclude(w=>w.Team).Where(de=>de.DepartmentId == department.DepartmentId)
                .Select(w=> new
                {
                    WorkId = w.WorkId,
                    WorkName = w.WorkName,
                    NumberProduct = w.TeamWorks.Sum(e=> e.TotalProduct),
                    TeamName = w.TeamWorks.Select(tw=>tw.Team.TeamName).Distinct(),
                    TotalProduct = w.TotalProduct,
                    UniCostName = w.UniCost.UnitName,
                    WorkArea = w.WorkArea.WorkAreaName,
                    Department= department.DepartmentName,
                    Status = w.StartDate > DateTime.Now ? "WorkNotStart" : (w.EndDate < DateTime.Now ? "WorkEnd" : ((w.EndDate > DateTime.Now && w.TeamWorks.Sum(e => e.TotalProduct) >= w.TotalProduct) ? "Done" : "NotDone")),
                }).ToList();
            return Ok(work);
        }
        [HttpGet("{wId}")]
        public IActionResult GetWorkDetailById(int wId)
        {
            var work = _context.Works.Where(w=>w.WorkId == wId).Include(w => w.UniCost).Include(w => w.WorkArea).Include(w => w.TeamWorks).ThenInclude(w => w.Team)
                .Select(w => new
                {
                    WorkId = w.WorkId,
                    WorkName = w.WorkName,
                    NumberProduct = w.TeamWorks != null ?  w.TeamWorks.Sum(e => e.TotalProduct) : 0,
                    TeamName = w.TeamWorks.Select(tw => tw.Team.TeamName).Distinct(),
                    TotalProduct = w.TotalProduct,
                    Cost = w.Cost,
                    UniCostName = w.UniCost.UnitName,
                    UnitCostId = w.UniCost.UniCostId,
                    WorkArea = w.WorkArea.WorkAreaName,
                    WorkAreaId = w.WorkArea.WorkAreaId,
                    TimeStart = w.StartDate.HasValue ? w.StartDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                    TimeEnd = w.EndDate.HasValue ? w.EndDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                    Status = w.StartDate > DateTime.Now ? "WorkNotStart" : (w.EndDate < DateTime.Now ? "WorkEnd" : ((w.EndDate > DateTime.Now && w.TeamWorks.Sum(e => e.TotalProduct) >= w.TotalProduct) ? "Done" : "NotDone")),
                    TimeRemain = w.StartDate > DateTime.Now ? (int)(w.StartDate - w.EndDate).Value.TotalDays : (w.EndDate < DateTime.Now ? 0 : (int)(w.EndDate - DateTime.Now).Value.TotalDays),
                    DepartmentId = w.DepartmentId,
                }).FirstOrDefault();
            return Ok(work);

        }
        [HttpGet("{teamId}/{employeeId}")]
        public IActionResult GetWorkDetailForTeamById(int teamId , int employeeId)
        {
            var department = _context.RolesEmployees.Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == employeeId && re.Role.RoleName == "Nhóm trưởng" && re.EndDate == null).Select(re => new
            {
                DepartmentId = re.DepartmentId,
                DepartmentName = re.Department.DepartmentName,
            }).FirstOrDefault();
            if (department == null)
            {
                return NotFound("notHaveDepartment");
            }
            var worklSchedule = _context.WorkSchedules.Include(ws=>ws.ShiftType).Where(ws=>ws.StartDate <= DateTime.Now && ws.EndDate == null && ws.TeamId == teamId)
                .Select(ws=> new
                {
                    StartTime = ws.ShiftType.StartTime,
                    Endtime = ws.ShiftType.EndTime,
                }).FirstOrDefault();

            var work = _context.Works.Include(w => w.UniCost).Include(w => w.WorkArea).Include(w => w.TeamWorks).ThenInclude(w => w.Team)
                .Where(de => de.DepartmentId == department.DepartmentId)
                .Select(w => new
                {
                    WorkId = w.WorkId,
                    TimeStart = w.StartDate.HasValue ? w.StartDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                    TimeEnd = w.EndDate.HasValue ? w.EndDate.Value.ToString("dd-MM-yyyy HH:mm:ss") : "",
                    TimeRemain = w.StartDate > DateTime.Now ? (int)(w.StartDate - w.EndDate).Value.TotalDays : (w.EndDate < DateTime.Now ? 0 : (int)(w.EndDate - DateTime.Now).Value.TotalDays),
                }).ToList();
            var workForTeam = work.Where(w => w.TimeRemain > 0);
            if (worklSchedule.StartTime > worklSchedule.Endtime)
            {
                workForTeam = work.Where(w => w.TimeRemain > 2);
            }
            
            return Ok(workForTeam);

        }
        //[HttpGet("{wId}")]
        //public async Task<ActionResult<IEnumerable<object>>> GetWorkById(int wId)
        //{
        //    var work = await _context.Works.Where(w=>w.WorkId == wId).Include(w => w.UniCost).Include(w => w.WorkArea).Include(w => w.TeamWorks).AsQueryable().ToListAsync();
        //    if(work == null)
        //    {
        //        return NotFound();
        //    }
        //    var result = new List<object>();
        //    var teamList = new List<object>();
        //    var teamListId = work.SelectMany(w=>w.TeamWorks.Select(tw => tw.TeamId).Distinct()).ToList();
        //    foreach (var id in teamListId)
        //    {
        //        var team = await _context.Teams.Include(t => t.TeamWorks).FirstOrDefaultAsync(t=>t.TeamId == id);
        //        if(team == null)
        //        {
        //            return NotFound(id);
        //        }
        //        teamList.Add(new
        //        {
        //            TeamId = id,
        //            TeamName = team.TeamName,
        //            TeamProduct = team.TeamWorks.Sum(tw=>tw.TotalProduct),
        //            Date = team.TeamWorks.Select(tw=>tw.Date).ToList(),

        //        });
        //    };
        //    result.Add(new
        //    {
        //        Team = teamList,
        //        UnitName = work.Select(w=>w.UniCost.UnitName),
        //        TotalProduct = work.Select(w => w.TeamWorks.Sum(tw=>tw.TotalProduct)).Single(),
        //        UniCostName = work.Select(w => w.UniCost.UnitName).Single(),
        //        WorkArea = work.Select(w => w.WorkArea.WorkAreaName).Single(),
        //    });
        //    return Ok(result);
        //}
        [HttpPost]
        public IActionResult AddWork([FromBody] WorkDTO workDTO)
        {
            try
            {
                var department = _context.RolesEmployees.Include(re => re.Role).Include(re => re.Department).Where(re => re.EmployeeId == workDTO.EmployeeId && re.Role.RoleName == "Nhóm trưởng" && re.EndDate == null).Select(re => new
                {
                    DepartmentId = re.DepartmentId,
                    DepartmentName = re.Department.DepartmentName,
                }).FirstOrDefault();
                if (department == null)
                {
                    return NotFound("notHaveDepartment");
                }
                var work =  _mapper.Map<Work>(workDTO);
                work.StartDate= !string.IsNullOrEmpty(workDTO.StartDateString) ? DateTime.ParseExact(workDTO.StartDateString, "dd-MM-yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture) : DateTime.Now;
                work.EndDate= !string.IsNullOrEmpty(workDTO.EndDateString) ? DateTime.ParseExact(workDTO.EndDateString, "dd-MM-yyyy HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture) : null;
                work.DepartmentId = department.DepartmentId;
                _context.Works.Add(work);
                _context.SaveChanges();
                return Ok("add success");

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public IActionResult UpdateWork([FromBody] WorkDTO workDTO)
        {
            try
            {
                var work = _context.Works.FirstOrDefault(w=>w.WorkId == workDTO.WorkId);
                if(work == null)
                {
                    return NotFound();
                }                                
                work.WorkAreaId= workDTO.WorkAreaId > 0 ? workDTO.WorkAreaId : work.WorkAreaId;
                work.WorkName = !string.IsNullOrEmpty(workDTO.WorkName) ? workDTO.WorkName : work.WorkName;
                work.StartDate = !string.IsNullOrEmpty(workDTO.StartDateString) ? DateTime.ParseExact(workDTO.StartDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) : work.StartDate;
                work.EndDate = !string.IsNullOrEmpty(workDTO.StartDateString) ? DateTime.ParseExact(workDTO.EndDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture) : work.EndDate;
                work.UniCostId = workDTO.UniCostId > 0 ? workDTO.UniCostId : work.UniCostId;
                work.TotalProduct = workDTO.TotalProduct > 0 ? workDTO.TotalProduct : work.TotalProduct;
                work.Cost = workDTO.Cost > 0 ? workDTO.Cost : work.Cost;
                work.Note = !string.IsNullOrEmpty(workDTO.Note) ? workDTO.Note : work.Note;
                _context.Works.Update(work);
                _context.SaveChanges();
                return Ok("add success");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
    }
}
