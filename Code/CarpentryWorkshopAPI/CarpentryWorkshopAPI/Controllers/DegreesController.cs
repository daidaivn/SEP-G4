using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DegreesController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;

        public DegreesController(SEPG4CCMSContext context)
        {
            _context = context;
        }

        // GET: api/Degrees
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Degree>>> GetDegrees()
        {
          if (_context.Degrees == null)
          {
              return NotFound();
          }
            return await _context.Degrees.ToListAsync();
        }

        // GET: api/Degrees/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Degree>> GetDegree(int id)
        {
          if (_context.Degrees == null)
          {
              return NotFound();
          }
            var degree = await _context.Degrees.FindAsync(id);

            if (degree == null)
            {
                return NotFound();
            }

            return degree;
        }

        // PUT: api/Degrees/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDegree(int id, Degree degree)
        {
            if (id != degree.DegreeId)
            {
                return BadRequest();
            }

            _context.Entry(degree).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DegreeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Degrees
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Degree>> PostDegree(Degree degree)
        {
          if (_context.Degrees == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.Degrees'  is null.");
          }
            _context.Degrees.Add(degree);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDegree", new { id = degree.DegreeId }, degree);
        }

        // DELETE: api/Degrees/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDegree(int id)
        {
            if (_context.Degrees == null)
            {
                return NotFound();
            }
            var degree = await _context.Degrees.FindAsync(id);
            if (degree == null)
            {
                return NotFound();
            }

            _context.Degrees.Remove(degree);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DegreeExists(int id)
        {
            return (_context.Degrees?.Any(e => e.DegreeId == id)).GetValueOrDefault();
        }
    }
}
