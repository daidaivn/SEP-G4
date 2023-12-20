using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Text;

namespace CarpentryWorkshopAPI.Controllers
{
    [Authorize(Roles = "DependentPerson")]
    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class DependentsController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public DependentsController(SEPG4CWMSContext context, IMapper mapper)
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
                return NotFound("Không tìm thấy dữ liệu");
            }
            var deEndDate = _context.Dependents.Where(de => (de.EndDate == null ? DateTime.MaxValue : de.EndDate) < DateTime.Now && de.Status == true).ToList();
            deEndDate.Select(de => de.Status = false);
            _context.UpdateRange(deEndDate);
            _context.SaveChanges();
            var dependents = _context.Dependents.Include(de => de.Employee).Include(de => de.Relationship)
                .Select(de => new DependentListDTO
                {
                    DependentId = de.DependentId,
                    EmployeeId = de.DependentId,
                    EmployeesName = de.Employee.LastName + " " +  de.Employee.FirstName,
                    FullName = de.FullName,
                    IdentifierCode = de.IdentifierCode,
                    Gender = de.Gender,
                    GenderString = de.Gender == true ? "Nam" : "Nữ",
                    DobString = de.Dob != null ? de.Dob.Value.ToString("dd'-'MM'-'yyyy") : "",
                    StartDateString = de.StartDate != null ? de.StartDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    EndDateString = de.EndDate != null ? de.EndDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    IdentifierName = de.IdentifierName,
                    NoteReason = de.NoteReason,
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
                return NotFound("Dữ liệu rỗng");
            }
            var dependent = _context.Dependents.Where(de => de.DependentId == id).Include(de => de.Employee).Include(de => de.Relationship)
                .Select(de => new DependentListDTO
                {
                    DependentId = de.DependentId,
                    EmployeeId = de.DependentId,
                    EmployeesName = de.Employee.FirstName + " " + de.Employee.LastName,
                    FullName = de.FullName,
                    IdentifierCode = de.IdentifierCode,
                    Gender = de.Gender,
                    GenderString = de.Gender == true ? "Nam" : "Nữ",
                    DobString = de.Dob != null ? de.Dob.Value.ToString("dd'-'MM'-'yyyy") : "",
                    StartDateString = de.StartDate != null ? de.StartDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    EndDateString = de.EndDate != null ? de.EndDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    IdentifierName = de.IdentifierName,
                    NoteReason = de.NoteReason,
                    RelationshipId = de.RelationshipId,
                    RelationshipName = de.Relationship.RelationshipName,
                    Status = de.Status,

                }).FirstOrDefault();
            if (dependent == null)
            {
                return NotFound("Không có người phụ thuộc");
            }

            return Ok(dependent);
        }

        // PUT: api/Dependents/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult UpdateDependent([FromBody] DependentDTO dependentDTO)
        {
            var dependent = _context.Dependents.FirstOrDefault(x => x.DependentId == dependentDTO.DependentId);
            if (dependent == null)
            {
                return NotFound();
            }
            dependent.EmployeeId = dependentDTO.EmployeeId > 0 ? dependentDTO.EmployeeId : dependent.EmployeeId;
            dependent.FullName = !string.IsNullOrEmpty(dependentDTO.FullName) ? dependentDTO.FullName : dependent.FullName;
            dependent.IdentifierCode = !string.IsNullOrEmpty(dependentDTO.IdentifierCode) ? dependentDTO.IdentifierCode : dependent.IdentifierCode;
            dependent.Gender = dependentDTO.Gender.HasValue ? dependentDTO.Gender : dependent.Gender;
            dependent.IdentifierName = !string.IsNullOrEmpty(dependentDTO.IdentifierName) ? dependentDTO.IdentifierName : dependent.IdentifierName;
            dependent.Status = dependentDTO.Status.HasValue ? dependentDTO.Status : dependent.Status;
            dependent.NoteReason = !string.IsNullOrEmpty(dependentDTO.NoteReason) ? dependentDTO.NoteReason : dependent.NoteReason;
            dependent.RelationshipId = dependentDTO.RelationshipId > 0 ? dependentDTO.RelationshipId : dependent.RelationshipId;
            dependent.Dob = !string.IsNullOrEmpty(dependentDTO.DobString) &&
                DateTime.TryParseExact(dependentDTO.DobString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out var parsedDate)
                ? parsedDate
                : dependent.Dob;
            if (dependentDTO.RelationshipId == 1)
            {
                DateTime? DOB = dependent.Dob;
                if (DOB.HasValue)
                {
                    dependent.EndDate = DOB.Value.AddYears(18);
                    dependent.StartDate = DOB;
                }
            }
            else
            {
                dependent.StartDate = !string.IsNullOrEmpty(dependentDTO.StartDateString) ? DateTime.ParseExact(dependentDTO.StartDateString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture) : dependent.StartDate;
                dependent.EndDate = null;
            }
            _context.Entry(dependent).State = EntityState.Modified;
            _context.SaveChanges();
            DependentsStatusHistory dependentsStatusHistory = new DependentsStatusHistory()
            {
                Action = "Update",
                ActionDate = DateTime.Now,
                CurrentEmployeeId = 1,
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
                    return NotFound("Không tìm thấy dữ liệu");
                }
                else
                {
                    return BadRequest("Lỗi dữ liệu");
                }
            }

            return Ok("Chỉnh sửa người phụ thuộc thành công");
        }

        // POST: api/Dependents
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult CreateDependent([FromBody] DependentDTO dependentDTO)
        {
            if (_context.Dependents == null)
            {
                return Problem("Dữ liệu rỗng");
            }
            try
            {
                var dependent = _mapper.Map<Dependent>(dependentDTO);
                dependent.Status = dependentDTO.Status.HasValue ? dependentDTO.Status : true;
                if (DateTime.TryParseExact(dependentDTO.DobString, "dd-MM-yyyy", null, System.Globalization.DateTimeStyles.None, out DateTime result))
                {
                    dependent.Dob = result;
                }
                else
                {
                    return BadRequest("Dữ liệu không hợp lệ");
                }
                if (dependentDTO.RelationshipId == 1)
                {
                    DateTime? DOB = dependent.Dob;
                    if (DOB.HasValue)
                    {
                        dependent.EndDate = DOB.Value.AddYears(18);
                        dependent.StartDate = DOB;
                    }
                }
                else if (dependentDTO.RelationshipId > 1)
                {
                    dependent.StartDate = !string.IsNullOrEmpty(dependentDTO.StartDateString) ? DateTime.ParseExact(dependentDTO.StartDateString, "dd-MM-yyyy",
                                           System.Globalization.CultureInfo.InvariantCulture) : DateTime.Now.Date;
                    dependent.EndDate = null;
                }
                else
                {
                    return BadRequest("Không có quan hệ");
                }
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
                return Ok("Thêm người phụ thuộc thành công");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
            Dependent dependent = _context.Dependents.Where(de => de.DependentId == id).SingleOrDefault();
            DependentsStatusHistory dependentsStatusHistory = new DependentsStatusHistory();

            if (dependent == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }
            else
            {
                if (dependent.Status == true)
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

            return Ok("Chuyển trạng thái người phụ thuộc thành công");
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
                var dependentsList = _context.Dependents.Include(de => de.Employee).Include(de => de.Relationship).ToList().AsQueryable();
                if (!string.IsNullOrEmpty(dependentsSearchDTO.InputText))
                {
                    string text = dependentsSearchDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                    dependentsList = dependentsList.Where(de => de.FullName.ToLower().Normalize(NormalizationForm.FormD).Contains(text) ||
                                                    de.IdentifierCode.Contains(text) ||
                                                    (de.Employee.FirstName + de.Employee.LastName).ToLower().Normalize(NormalizationForm.FormD).Contains(text) ||
                                                    de.EmployeeId.ToString() == text);
                }
                if (dependentsSearchDTO.Status.HasValue)
                {
                    dependentsList = dependentsList.Where(de => de.Status == dependentsSearchDTO.Status);
                }
                if (dependentsSearchDTO.Gender.HasValue)
                {
                    dependentsList = dependentsList.Where(de => de.Gender == dependentsSearchDTO.Gender);
                }
                if (dependentsList == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = dependentsList.Select(de => new DependentListDTO
                {
                    DependentId = de.DependentId,
                    EmployeeId = de.DependentId,
                    EmployeesName = de.Employee.FirstName + " " + de.Employee.LastName,
                    FullName = de.FullName,
                    IdentifierCode = de.IdentifierCode,
                    Gender = de.Gender,
                    GenderString = de.Gender == true ? "Nam" : "Nữ",
                    DobString = de.Dob != null ? de.Dob.Value.ToString("dd'-'MM'-'yyyy") : "",
                    StartDateString = de.StartDate != null ? de.StartDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    EndDateString = de.EndDate != null ? de.EndDate.Value.ToString("dd'-'MM'-'yyyy") : "",
                    IdentifierName = de.IdentifierName,
                    NoteReason = de.NoteReason,
                    RelationshipId = de.RelationshipId,
                    RelationshipName = de.Relationship.RelationshipName,
                    Status = de.Status,

                });

                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }

    }
}
