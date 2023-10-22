using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;

        public PagesController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;

        }

        [HttpGet]
        public IActionResult GetAllPage()
        {
            try
            {
                var page = _context.Pages.ToList();
                return Ok(_mapper.Map<List<PageDTO>>(page));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("{id}")]
        public IActionResult GetPageById(int id)
        {
            try
            {
                var page = _context.Pages.Where(pa=>pa.PageId == id).FirstOrDefault();
                return Ok(_mapper.Map<PageDTO>(page));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpGet("{text}")]
        public IActionResult GetPageByText(string text)
        {
            try
            {
                var page = _context.Pages.Where(pa => pa.PageName.ToLower().Contains(text.ToLower())).ToList();
                if(page.Count > 0) 
                {
                    return Ok(_mapper.Map<List<PageDTO>>(page));
                }
                else
                {
                    return Ok("not have data");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut]
        public IActionResult ChangeStatusPage(int id)
        {
            try
            {
                var page = _context.Pages.Where(pa => pa.PageId == id).FirstOrDefault();
                if(page == null)
                {
                    return NotFound("can not find page");
                }
                if(page.Status == true)
                {
                    page.Status= false;
                }
                else
                {
                    page.Status=true;
                }
                _context.Pages.Update(page);
                _context.SaveChanges();
                return Ok("sucessfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
