using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class WorkAreasController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public WorkAreasController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllWorkAreas()
        {
            try
            {
                var areas = _context.WorkAreas.ToList();
                if (areas == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<WorkAreasDTO>>(areas);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }

        }
        [HttpGet]
        public IActionResult CreateAndUpdateWorkAreas([FromBody] WorkAreasDTO workAreasDTO)
        {
            try
            {
                if (workAreasDTO.WorkAreaId == 0)
                {
                    var dto = _mapper.Map<WorkArea>(workAreasDTO);
                    if (dto == null)
                    {
                        return BadRequest("Lỗi dữ liệu");
                    }
                    _context.WorkAreas.Add(dto);
                    _context.SaveChanges();
                    return Ok("Tạo phân khu thành công");
                }
                else
                {
                    var dto = _mapper.Map<WorkArea>(workAreasDTO);
                    if (dto == null)
                    {
                        return BadRequest();
                    }
                    _context.WorkAreas.Update(dto);
                    _context.SaveChanges();
                    return Ok("Chỉnh sửa phân khu thành công");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }

        }
        [HttpPost]
        public IActionResult Filter(bool status)
        {
            try
            {
                var filter = _context.WorkAreas
                    .Where(x => x.Status == status)
                    .ToList();
                if (filter == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                return Ok(filter);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
