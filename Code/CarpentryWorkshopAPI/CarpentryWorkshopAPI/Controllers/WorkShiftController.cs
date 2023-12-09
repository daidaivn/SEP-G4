using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class WorkShiftController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public WorkShiftController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //[HttpGet]
        //public IActionResult GetAllWorkShift()
        //{
        //    try
        //    {
        //        var wst = _context.WorkSchedules
        //            .Include(x => x.ShiftType)
        //            .Include(x => x.Team)
        //            .ThenInclude(t => t.TeamWorks)
        //            .ThenInclude(tw => tw.Work)
        //            .Select(ws => new WorkShiftDTO
        //            {
        //                ShiftTypeId = ws.ShiftTypeId,
        //                TypeName = ws.ShiftType.TypeName,
        //                WorkId = ws.Team.TeamWorks.Select(x => x.WorkId).FirstOrDefault(),
        //                WorkName = ws.Team.TeamWorks.Select(tw => tw.Work.WorkName).FirstOrDefault(),
        //                WorkTime = ws.ShiftType.StartTime + " - " + ws.ShiftType.EndTime,
        //                Date = ws.Team.TeamWorks.Select(tw => tw.Date).FirstOrDefault().Value.Date,

        //            });


        //    }catch(Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
