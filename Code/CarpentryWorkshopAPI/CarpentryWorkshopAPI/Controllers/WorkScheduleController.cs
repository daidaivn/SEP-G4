using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class WorkScheduleController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public WorkScheduleController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetALlSchedules()
        {
            try
            {
                var schedules = _context.WorkSchedules.ToList();
                if (schedules == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<WorkScheduleDTO>>(schedules);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult CreateAndUpdateWorkSchedule([FromBody] WorkScheduleDTO workScheduleDTO)
        {
            try
            {
                if (workScheduleDTO.WorkScheduleId == 0)
                {
                    var newschedule = _mapper.Map<WorkSchedule>(workScheduleDTO);
                    if (newschedule == null)
                    {
                        return NotFound();
                    }
                    WorkScheduleStatusHistory history = new WorkScheduleStatusHistory
                    {
                        WorkScheduleId= newschedule.WorkScheduleId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.WorkScheduleStatusHistories.Add(history);
                    _context.WorkSchedules.Add(newschedule);
                    _context.SaveChanges();
                    return Ok("Create work schedule successful");
                }
                else
                {
                    var newschedule = _mapper.Map<WorkSchedule>(workScheduleDTO);
                    if (newschedule == null)
                    {
                        return NotFound();
                    }
                    WorkScheduleStatusHistory history = new WorkScheduleStatusHistory
                    {
                        WorkScheduleId = newschedule.WorkScheduleId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.WorkScheduleStatusHistories.Add(history);
                    _context.WorkSchedules.Update(newschedule);
                    _context.SaveChanges();
                    return Ok("Update work schedule successful");
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPut]
        public IActionResult ChangStatus(int wid)
        {
            try
            {
                var schedule = _context.WorkSchedules.FirstOrDefault(x => x.WorkScheduleId == wid);
                if (schedule == null)
                {
                    return NotFound();
                }
                if (schedule.Status == true)
                {
                    schedule.Status = false;
                }
                else
                {
                    schedule.Status = true;
                }
                WorkScheduleStatusHistory history = new WorkScheduleStatusHistory
                {
                    WorkScheduleId = schedule.WorkScheduleId,
                    Action = "Change Status",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = null,
                };
                _context.WorkScheduleStatusHistories.Add(history);
                _context.SaveChanges();
                return Ok("Change status successful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
