using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class ShiftTypeController : Controller
    {
       private readonly SEPG4CCMSContext _context;
       private readonly IMapper _mapper;
       public ShiftTypeController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllShiftTyoe()
        {
            try
            {
                var types = _context.ShiftTypes.ToList();
                if (types == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<CreateShiftTypeDTO>>(types);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
        [HttpPost]
        public IActionResult CreateAndUpdateShiftType([FromBody] CreateShiftTypeDTO createShiftTypeDTO)
        {
            try
            {
                if (createShiftTypeDTO.ShiftTypeId == 0)
                {
                    var type = _mapper.Map<ShiftType>(createShiftTypeDTO);
                    if (type == null)
                    {
                        return NotFound();
                    }
                    _context.ShiftTypes.Add(type);
                    _context.SaveChanges();
                    HistoryChangeShiftType history = new HistoryChangeShiftType
                    {
                        ShiftTypeId = type.ShiftTypeId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeShiftTypes.Add(history);
                    _context.SaveChanges();
                    return Ok("Create shift type successful");
                }
                else
                {
                    var type = _mapper.Map<ShiftType>(createShiftTypeDTO);
                    if (type == null)
                    {
                        return NotFound();
                    }
                    _context.ShiftTypes.Update(type);
                    HistoryChangeShiftType history = new HistoryChangeShiftType
                    {
                        ShiftTypeId = type.ShiftTypeId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.HistoryChangeShiftTypes.Add(history);                 
                    _context.SaveChanges();
                    return Ok("Update shift type successful");

                }

            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet] 
        public IActionResult Filter(bool status)
        {
            try
            {
                var types = _context.ShiftTypes
                    .Where(x => x.Status == status)
                    .ToList();
                if (types == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<CreateShiftTypeDTO>>(types);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
