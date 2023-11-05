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
using Microsoft.AspNetCore.Authorization;
using System.Data;
using System.Text;
using System.Data.Common;

namespace CarpentryWorkshopAPI.Controllers
{
    [Authorize(Roles = "DependentPerson")]
    [Route("CCMSapi/[controller]/[action]")]
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
        public IActionResult GetAllDependentPeople()
        {
            if (_context.Dependents == null)
            {
                return NotFound();
            }
            var deEndDate = _context.Dependents.Where(de => (de.EndDate == null ? DateTime.MaxValue : de.EndDate) < DateTime.Now && de.Status == true).ToList();
            deEndDate.Select(de => de.Status = false);
            _context.UpdateRange(deEndDate);
            _context.SaveChanges();
            var dependents = _context.Dependents.Include(de=>de.Employee).Include(de=>de.Relationship)
                .Select(de=>new DependentListDTO
                {
                    DependentId = de.DependentId,
                    EmployeeId = de.DependentId,
                    EmployeesName = de.Employee.FirstName +" "+ de.Employee.LastName,
                    FullName = de.FullName,
                    IdentifierCode = de.IdentifierCode,
                    Gender = de.Gender,
                    GenderString = de.Gender == true ? "nam" : "nữ",
                    DobString = de.Dob != null ? de.Dob.Value.ToString("dd'-'MM'-'yyyy") : "",
                    StartDateString = de.StartDate != null ? de.StartDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    EndDateString = de.EndDate != null ? de.EndDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    IdentifierName = de.IdentifierName,
                    NoteReason = de.NoteReason,
                    Relation = de.Relation,
                    RelationshipId = de.RelationshipId,
                    RelationshipName = de.Relationship.RelationshipName,
                    Status = de.Status,

                }).ToList();
            
            return Ok(dependents);
        }

        // GET: api/Dependents/5
        [HttpGet("{id}")]
        public IActionResult GetDependentPeopleById(int id)
        {
          if (_context.Dependents == null)
          {
              return NotFound();
          }
            var dependent = _context.Dependents.Where(de=>de.DependentId == id).Include(de => de.Employee).Include(de => de.Relationship)
                .Select(de => new DependentListDTO
                {
                    DependentId = de.DependentId,
                    EmployeeId = de.DependentId,
                    EmployeesName = de.Employee.FirstName + " " + de.Employee.LastName,
                    FullName = de.FullName,
                    IdentifierCode = de.IdentifierCode,
                    Gender = de.Gender,
                    GenderString = de.Gender == true ? "nam" : "nữ",
                    DobString = de.Dob != null ? de.Dob.Value.ToString("dd'-'MM'-'yyyy") : "",
                    StartDateString = de.StartDate != null ? de.StartDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    EndDateString = de.EndDate != null ? de.EndDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    IdentifierName = de.IdentifierName,
                    NoteReason = de.NoteReason,
                    Relation = de.Relation,
                    RelationshipId = de.RelationshipId,
                    RelationshipName = de.Relationship.RelationshipName,
                    Status = de.Status,

                }).FirstOrDefault();
            if (dependent == null)
            {
                return NotFound();
            }

            return Ok(dependent);
        }

        // PUT: api/Dependents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult UpdateDependent([FromBody]DependentDTO dependentDTO)
        {
            Dependent dependent = _mapper.Map<Dependent>(dependentDTO);
            dependent.StartDate = !string.IsNullOrEmpty(dependentDTO.StartDateString) ? DateTime.ParseExact(dependentDTO.StartDateString, "dd-MM-yyyy",
                                        System.Globalization.CultureInfo.InvariantCulture) : null;
            dependent.EndDate = !string.IsNullOrEmpty(dependentDTO.EndDateString) ? DateTime.ParseExact(dependentDTO.EndDateString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture) : null;
            dependent.Dob = !string.IsNullOrEmpty(dependentDTO.DobString) ? DateTime.ParseExact(dependentDTO.DobString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture) : null;
            _context.Entry(dependent).State = EntityState.Modified;
            _context.SaveChanges();
            DependentsStatusHistory dependentsStatusHistory= new DependentsStatusHistory() 
            {
                Action = "Update",
                ActionDate= DateTime.Now,
                CurrentEmployeeId= 1,
                DependentId = dependentDTO.DependentId
            };
            _context.DependentsStatusHistories.Add(dependentsStatusHistory);
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                if (!DependentExists(dependentDTO.DependentId))
                {
                    return NotFound();
                }
                else
                {
                    return BadRequest(ex.Message);
                }
            }

            return Ok("update success");
        }

        // POST: api/Dependents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult CreateDependent([FromBody]DependentDTO dependentDTO)
        {
          if (_context.Dependents == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.Dependents'  is null.");
          }
            try 
            {
                var dependent = _mapper.Map<Dependent>(dependentDTO);
                dependent.StartDate = !string.IsNullOrEmpty(dependentDTO.StartDateString) ? DateTime.ParseExact(dependentDTO.StartDateString, "dd-MM-yyyy",
                                        System.Globalization.CultureInfo.InvariantCulture) : null;
                dependent.EndDate = !string.IsNullOrEmpty(dependentDTO.EndDateString) ? DateTime.ParseExact(dependentDTO.EndDateString, "dd-MM-yyyy",
                                           System.Globalization.CultureInfo.InvariantCulture) : null;
                dependent.Dob = !string.IsNullOrEmpty(dependentDTO.DobString) ? DateTime.ParseExact(dependentDTO.DobString, "dd-MM-yyyy",
                                           System.Globalization.CultureInfo.InvariantCulture) : null;
                _context.Dependents.Add(dependent);               
                _context.SaveChanges();
                DependentsStatusHistory dependentsStatusHistory = new DependentsStatusHistory()
                {
                    Action = "Insert",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = 1,
                    DependentId = dependent.DependentId
                };
                _context.DependentsStatusHistories.Add(dependentsStatusHistory);
                _context.SaveChanges();
                return Ok("add success");
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }                       
        }

        // DELETE: api/Dependents/5
        [HttpPut("{id}")]
        public IActionResult ChangeDependentStatus(int id)
        {
            if (_context.Dependents == null)
            {
                return NotFound();
            }
            Dependent dependent = _context.Dependents.Where(de=>de.DependentId == id).SingleOrDefault();
            DependentsStatusHistory dependentsStatusHistory = new DependentsStatusHistory();            
            
            if (dependent == null)
            {
                return NotFound();
            }
            else
            {
                if(dependent.Status == true)
                {
                    dependentsStatusHistory.DependentId = id;
                    dependentsStatusHistory.Action = "Change status false";
                    dependentsStatusHistory.ActionDate = DateTime.Now;
                    dependentsStatusHistory.CurrentEmployeeId = 1;
                    dependent.Status = false;
                }
                else
                {
                    dependentsStatusHistory.DependentId = id;
                    dependentsStatusHistory.Action = "Change status true";
                    dependentsStatusHistory.ActionDate = DateTime.Now;
                    dependentsStatusHistory.CurrentEmployeeId = 1;
                    dependent.Status = true;
                }
                _context.DependentsStatusHistories.Add(dependentsStatusHistory);
                _context.Dependents.Update(dependent);
            }

            _context.SaveChanges();

            return Ok("success change status");
        }

        private bool DependentExists(int id)
        {
            return (_context.Dependents?.Any(e => e.DependentId == id)).GetValueOrDefault();
        }
        //Search and filter
        [HttpPost]
        public IActionResult SearchDependents(DependentsSearchDTO dependentsSearchDTO)
        {
            try
            {
                var dependentsList = _context.Dependents.Include(de => de.Employee).Include(de=>de.Relationship).ToList().AsQueryable();
                if (!string.IsNullOrEmpty(dependentsSearchDTO.InputText))
                {
                    string text = dependentsSearchDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                    dependentsList = dependentsList.Where(de => de.FullName.ToLower().Normalize(NormalizationForm.FormD).Contains(text) ||
                                                    de.IdentifierCode.Contains(text) ||
                                                    (de.Employee.FirstName+de.Employee.LastName).ToLower().Normalize(NormalizationForm.FormD).Contains(text)||
                                                    de.EmployeeId.ToString() == text);
                }
                if (dependentsSearchDTO.Status.HasValue)
                {
                    dependentsList = dependentsList.Where(de => de.Status == dependentsSearchDTO.Status);
                }
                if(dependentsSearchDTO.Gender.HasValue)
                {
                    dependentsList = dependentsList.Where(de => de.Gender == dependentsSearchDTO.Gender);
                }
                if(dependentsList == null)
                {
                    return NotFound("no data");
                }
                var dto = dependentsList.Select(de => new DependentListDTO
                {
                    DependentId = de.DependentId,
                    EmployeeId = de.DependentId,
                    EmployeesName = de.Employee.FirstName + " " + de.Employee.LastName,
                    FullName = de.FullName,
                    IdentifierCode = de.IdentifierCode,
                    Gender = de.Gender,
                    GenderString = de.Gender == true ? "nam" : "nữ",
                    DobString = de.Dob != null ? de.Dob.Value.ToString("dd'-'MM'-'yyyy") : "",
                    StartDateString = de.StartDate != null ? de.StartDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    EndDateString = de.EndDate != null ? de.EndDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    IdentifierName = de.IdentifierName,
                    NoteReason = de.NoteReason,
                    Relation = de.Relation,
                    RelationshipId = de.RelationshipId,
                    RelationshipName = de.Relationship.RelationshipName,
                    Status = de.Status,

                });

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
