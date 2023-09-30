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
    [Route("api/[controller]")]
    [ApiController]
    public class DependentsController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public DependentsController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Dependents
        [HttpGet]
        public IActionResult GetDependents()
        {
          if (_context.Dependents == null)
          {
              return NotFound();
          }
          List<Dependent> dependents = _context.Dependents.ToList();
          List<DependentDTO> dependentDTOs = _mapper.Map<List<DependentDTO>>(dependents);
          return Ok(dependentDTOs);
        }

        // GET: api/Dependents/5
        [HttpGet("{id}")]
        public IActionResult GetDependent(int id)
        {
          if (_context.Dependents == null)
          {
              return NotFound();
          }
            Dependent dependent = _context.Dependents.SingleOrDefault(de=>de.DependentId == id);
            DependentDTO dependentDTO = _mapper.Map<DependentDTO>(dependent);
            if (dependent == null)
            {
                return NotFound();
            }

            return Ok(dependentDTO);
        }

        // PUT: api/Dependents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult PutDependent([FromBody]DependentDTO dependentDTO)
        {
            Dependent dependent = _mapper.Map<Dependent>(dependentDTO);
            _context.Entry(dependent).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DependentExists(dependentDTO.DependentId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok("update success");
        }

        // POST: api/Dependents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult PostDependent([FromBody]DependentDTO dependentDTO)
        {
          if (_context.Dependents == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.Dependents'  is null.");
          }
            Dependent dependent = _mapper.Map<Dependent>(dependentDTO);
            _context.Dependents.Add(dependent);
            _context.SaveChanges();

            return CreatedAtAction("GetDependent", new { id = dependent.DependentId }, dependent);
        }

        // DELETE: api/Dependents/5
        [HttpDelete("{id}")]
        public IActionResult DeleteDependent(int id)
        {
            if (_context.Dependents == null)
            {
                return NotFound();
            }
            Dependent dependent = _context.Dependents.Where(de=>de.DependentId == id).SingleOrDefault();
            if (dependent == null)
            {
                return NotFound();
            }
            else
            {
                if(dependent.Status == true)
                {
                    dependent.Status = false;
                }
                else
                {
                    dependent.Status = true;
                }
                 
                _context.Dependents.Update(dependent);
            }

            _context.SaveChanges();

            return NoContent();
        }

        private bool DependentExists(int id)
        {
            return (_context.Dependents?.Any(e => e.DependentId == id)).GetValueOrDefault();
        }
        //Search 
    }
}
