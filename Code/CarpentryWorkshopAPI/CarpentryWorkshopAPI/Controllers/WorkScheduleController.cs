using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CWMSapi/[controller]/[action]")]
    public class WorkScheduleController : Controller
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public WorkScheduleController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetALlSchedules()
        {
            try
            {
                var schedules = _context.WorkSchedules
                    .Include(x => x.ShiftType)
                    .Include(x => x.Team)
                    .ToList();
                if (schedules == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<WorkScheduleDTO>>(schedules);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult CreateAndUpdateWorkSchedule([FromBody] CreateWorkScheduleDTO createWorkScheduleDTO)
        {
            try
            {
                if (createWorkScheduleDTO.WorkScheduleId == 0)
                {
                    var newschedule = _mapper.Map<WorkSchedule>(createWorkScheduleDTO);
                    if (newschedule == null)
                    {
                        return NotFound();
                    }
                    _context.WorkSchedules.Add(newschedule);
                    _context.SaveChanges();
                    WorkScheduleStatusHistory history = new WorkScheduleStatusHistory
                    {
                        WorkScheduleId = newschedule.WorkScheduleId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.WorkScheduleStatusHistories.Add(history);
                    _context.SaveChanges();
                    return Ok("Tạo lịch làm việc thành công");
                }
                else
                {
                    var newschedule = _mapper.Map<WorkSchedule>(createWorkScheduleDTO);
                    if (newschedule == null)
                    {
                        return NotFound();
                    }
                    _context.WorkSchedules.Update(newschedule);
                    WorkScheduleStatusHistory history = new WorkScheduleStatusHistory
                    {
                        WorkScheduleId = newschedule.WorkScheduleId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.WorkScheduleStatusHistories.Add(history);
                    _context.SaveChanges();
                    return Ok("Chỉnh sửa lịch làm việc thành công");
                }
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                    return NotFound("Không tìm thấy dữ liệu");
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
                return Ok("Chuyển trạng thái lịch làm việc thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
