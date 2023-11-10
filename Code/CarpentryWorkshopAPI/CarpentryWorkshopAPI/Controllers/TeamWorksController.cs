using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult UpdateWorkForTeam([FromBody] TeamWorkDTO teamWorkDTO)
        {
            try
            {
                var work = _context.Works.FirstOrDefault(w => w.WorkId == teamWorkDTO.WorkId);
                if (work == null)
                {
                    return NotFound("can not find workid");
                }
                var teamWorkRemove = _context.TeamWorks.Where(tw => tw.TeamId == teamWorkDTO.TeamId && tw.Date < tw.Work.EndDate && tw.Date > DateTime.Now);
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
