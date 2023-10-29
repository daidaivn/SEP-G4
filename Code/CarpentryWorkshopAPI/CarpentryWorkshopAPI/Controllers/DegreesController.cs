using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.Models;
using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DegreesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;
        public DegreesController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public IActionResult GetAllDegrees()
        {
            List<Degree> degreeList = _context.Degrees.ToList();
            return Ok(_mapper.Map<List<DegreeDTO>>(degreeList));
        }


        [HttpGet("{id}")]
        public IActionResult GetDegree(int id)
        {
            var degree = _context.Degrees.SingleOrDefault(de => de.DegreeId == id);
            return Ok(_mapper.Map<DegreeDTO>(degree));
        }

        // PUT: api/Degrees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult UpdateDegree([FromBody] DegreeDTO degreeDTO)
        {

            Degree degree = _mapper.Map<Degree>(degreeDTO);
            _context.Entry(degree).State = EntityState.Modified;
            DegreesStatusHistory degreesStatusHistory = new DegreesStatusHistory()
            {
                Action = "Update",
                ActionDate= DateTime.Now,
                CurrentEmployeeId = 1,
                DegreeId= degree.DegreeId,
            };
            _context.DegreesStatusHistories.Add(degreesStatusHistory);
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(degree);
        }

        // POST: api/Degrees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult CreateDegree(string degreeName)
        {
          if (_context.Degrees == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.Degrees'  is null.");
          }
            Degree degree = new Degree()
            {
                DegreeName = degreeName,
                Status = true
            };
            _context.Degrees.Add(degree);
            _context.SaveChanges();
            DegreesStatusHistory degreesStatusHistory = new DegreesStatusHistory()
            {
                Action = "Insert",
                ActionDate = DateTime.Now,
                CurrentEmployeeId = 1,
                DegreeId = degree.DegreeId,
            };
            _context.DegreesStatusHistories.Add(degreesStatusHistory);
            _context.SaveChanges();

            return CreatedAtAction("GetDegree", new { id = degree.DegreeId }, degree);
        }

        // DELETE: api/Degrees/5
        [HttpPut("{id}")]
        public IActionResult ChangeStatusDegree(int id)
        {
            if (_context.Degrees == null)
            {
                return NotFound();
            }
            var degree = _context.Degrees.SingleOrDefault(de => de.DegreeId == id);
            DegreesStatusHistory degreesStatusHistory = new DegreesStatusHistory();
            if (degree == null)
            {
                return NotFound();
            }
            if(degree.Status == true)
            {
                degreesStatusHistory.DegreeId = id;
                degreesStatusHistory.Action = "Change status false";
                degreesStatusHistory.ActionDate = DateTime.Now;
                degreesStatusHistory.CurrentEmployeeId = 1;
                degree.Status = false;
            }
            else
            {
                degreesStatusHistory.DegreeId = id;
                degreesStatusHistory.Action = "Change status true";
                degreesStatusHistory.ActionDate = DateTime.Now;
                degreesStatusHistory.CurrentEmployeeId = 1;
                degree.Status = true;
            }
            _context.DegreesStatusHistories.Add(degreesStatusHistory);
            _context.Degrees.Update(degree);
            _context.SaveChanges();

            return NoContent();
        }
        [HttpPost("search")]
        public IActionResult SearchDegrees([FromBody] DegreeDTO degreeDTO)
        {
            if (_context.Degrees == null)
            {
                return NotFound();
            }
            var degree = _context.Degrees.ToList().AsQueryable();
            if (!string.IsNullOrEmpty(degreeDTO.DegreeName))
            {
                string text = degreeDTO.DegreeName.ToLower().Normalize(NormalizationForm.FormD);
                degree = degree.Where(de => de.DegreeName.ToLower().Normalize(NormalizationForm.FormD).Contains(text));
            }
            if(degreeDTO.Status.HasValue)
            {
                degree = degree.Where(de => de.Status == degreeDTO.Status);
            }
            var degreeListDTO = _mapper.Map<List<DegreeDTO>>(degree);
            return Ok(degreeListDTO);
        } 
    }
}
