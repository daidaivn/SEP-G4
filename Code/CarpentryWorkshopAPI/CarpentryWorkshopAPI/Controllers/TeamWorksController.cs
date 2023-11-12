using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class TeamWorksController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;

        public TeamWorksController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpPost]
        public IActionResult GetWorkDetaiForShiftManage(int id)
        {
            try
            {
                var details = _context.TeamWorks
                    .Include(x => x.Work)
                    .ThenInclude(x=>x.UniCost)
                    .Include(x => x.Work)
                    .ThenInclude(x => x.WorkArea)
                    .Include(x => x.Team)
                    .Where(de => de.Team.TeamLeaderId == id || de.Team.TeamSubLeaderId == id && de.Date.Value.Date == DateTime.Now.Date)
                    .Select(d => new DetailForSmDTO
                    {
                        TeamWorkId = d.TeamWorkId,
                        TeamId = d.TeamId,
                        TeamName = d.Team.TeamName,
                        ProductName = d.Work.UniCost.UnitName,
                        WorkAreaName =d.Work.WorkArea.WorkAreaName,
                        WorkId = d.WorkId,
                        WorkName = d.Work.WorkName,
                        NumberOFProductToday = d.TotalProduct,
                        Date = DateTime.Now.ToShortDateString(),
                    }).FirstOrDefault();                
                if (details == null)
                {
                    return NotFound();
                }
                details.NumberOfProduct = _context.TeamWorks.Include(de=>de.Team).Where(de => de.Team.TeamLeaderId == id || de.Team.TeamSubLeaderId == id).Sum(de => de.TotalProduct);
                return Ok(details);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult UpdateTeamWork([FromBody] TeamWorkUpdateDTO teamWorkUpdateDTO)
        {
            try
            {
                var teamWork = _context.TeamWorks.Where(tw => tw.TeamWorkId == teamWorkUpdateDTO.teamWorkId).FirstOrDefault();
                if (teamWork == null)
                {
                    return NotFound();
                }
                teamWork.TotalProduct = teamWorkUpdateDTO.numberProduct;
                _context.TeamWorks.Update(teamWork);
                _context.SaveChanges();
                return Ok("Update success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult AddWorkForTeam([FromBody] TeamWorkDTO teamWorkDTO)
        {
            try
            {
                var work = _context.Works.FirstOrDefault(w => w.WorkId == teamWorkDTO.WorkId);
                if (work == null)
                {
                    return NotFound("can not find workid");
                }
                var startDate = work.StartDate;
                if (DateTime.Now < work.StartDate)
                {
                    startDate = DateTime.Now;
                }
                while (work.StartDate > work.EndDate)
                {
                    TeamWork teamWork = new TeamWork()
                    {
                        WorkId = work.WorkId,
                        TeamId = teamWorkDTO.TeamId,
                        TotalProduct = 0,
                        Date = startDate,
                    };
                    _context.TeamWorks.Add(teamWork);
                    startDate.Value.AddDays(1);
                }
                _context.SaveChanges();
                return Ok("Add suceess");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }                       
        }
        [HttpPost]
        public IActionResult RemoveWorkForTeam([FromBody] TeamWorkDTO teamWorkDTO)
        {
            try
            {
                var work = _context.Works.FirstOrDefault(w => w.WorkId == teamWorkDTO.WorkId);
                if (work == null)
                {
                    return NotFound("can not find workid");
                }
                var teamWorkRemove = _context.TeamWorks.Where(tw => tw.WorkId == teamWorkDTO.WorkId && tw.TeamId == teamWorkDTO.TeamId && tw.Date < tw.Work.EndDate && tw.Date > DateTime.Now);
                if (teamWorkRemove.Any())
                {
                    _context.TeamWorks.RemoveRange(teamWorkRemove);
                    _context.SaveChanges();
                }
                var startDate = work.StartDate;
                if (DateTime.Now < work.StartDate)
                {
                    startDate = DateTime.Now;
                }
                while (work.StartDate > work.EndDate)
                {
                    TeamWork teamWork = new TeamWork()
                    {
                        WorkId = work.WorkId,
                        TeamId = teamWorkDTO.TeamId,
                        TotalProduct = 0,
                        Date = startDate,
                    };
                    _context.TeamWorks.Add(teamWork);
                    startDate.Value.AddDays(1);
                }
                _context.SaveChanges();
                return Ok("Add suceess");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
