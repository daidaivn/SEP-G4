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
            return Ok(_mapper.Map<DgreeDTO>(degree));
        }

        // PUT: api/Degrees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public IActionResult UpdateDegree([FromBody] DgreeDTO dgreeDTO)
        {
            Degree degree = _mapper.Map<Degree>(dgreeDTO);
            _context.Entry(degree).State = EntityState.Modified;

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
        public IActionResult CreateDegree([FromBody] DegreeDTO degreeDTO)
        {
          if (_context.Degrees == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.Degrees'  is null.");
          }
            Degree degree = _mapper.Map<Degree>(degreeDTO);
            _context.Degrees.Add(degree);
            _context.SaveChanges();

            return CreatedAtAction("GetDegree", new { id = degree.DegreeId }, degree);
        }

        // DELETE: api/Degrees/5
        [HttpDelete("{id}")]
        public IActionResult UpdateStatusDegree(int id)
        {
            if (_context.Degrees == null)
            {
                return NotFound();
            }
            var degree = _context.Degrees.SingleOrDefault(de => de.DegreeId == id);
            if (degree == null)
            {
                return NotFound();
            }
            if(degree.Status == true)
            {
                degree.Status = false;
            }
            else
            {
                degree.Status = true;
            }
            _context.Degrees.Update(degree);
            _context.SaveChanges();

            return NoContent();
        }
        [HttpPost]
        public IActionResult SearchDegrees([FromBody] DegreeDTO degreeDTO)
        {
            if (_context.Degrees == null)
            {
                return NotFound();
            }
            var degree = _context.Degrees.AsQueryable();
            if (!string.IsNullOrEmpty(degreeDTO.DegreeName))
            {
                degree = degree.Where(de => de.DegreeName.Contains(degreeDTO.DegreeName));
            }
            if(degreeDTO.Status == true)
            {
                degree = degree.Where(de => de.Status == true);
            }
            if (degreeDTO.Status == false)
            {
                degree = degree.Where(de => de.Status == false);
            }
            return Ok(_mapper.Map<DegreeDTO>(degree.ToList()));
        } 
    }
}
