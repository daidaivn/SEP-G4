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

    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;

        public DepartmentsController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [Authorize(Roles = "ListEmployee,ListDepartment")]
        [HttpGet]
        public IActionResult GetAllDepartments()
        {
            if (_context.Departments == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }
            var list = _context.Departments.Include(de => de.RolesEmployees).ThenInclude(de => de.Employee).ToList();
            var number = _context.Departments.Include(de => de.RolesEmployees).Select(de => de.RolesEmployees.Where(re => re.EndDate == null).Select(de => de.EmployeeId).Distinct().Count());
            List<DepartmentListDTO> listDTO = _mapper.Map<List<DepartmentListDTO>>(list);

            return Ok(listDTO);
        }
        [Authorize(Roles = "ListDepartment")]
        // GET: api/Departments/5
        [HttpGet("{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            if (_context.Departments == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }
            var department = _context.Departments.Where(e => e.DepartmentId == id).FirstOrDefault();
            DepartmentListDTO departmentDTO = _mapper.Map<DepartmentListDTO>(department);
            if (department == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }
            return Ok(departmentDTO);
        }
        [Authorize(Roles = "ListDepartment")]
        // PUT: api/Departments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult UpdateDepartment([FromBody] DepartmentDTO departmentDTO)
        {

            try
            {
                var department = _context.Departments.FirstOrDefault(de => de.DepartmentId == departmentDTO.DepartmentId);
                if (department == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                department.DepartmentName = !string.IsNullOrEmpty(departmentDTO.DepartmentName) ? departmentDTO.DepartmentName : department.DepartmentName;
                department.Status = departmentDTO.Status.HasValue ? departmentDTO.Status : department.Status;
                _context.Entry(department).State = EntityState.Modified;
                _context.SaveChanges();
                DepartmentsStatusHistory departmentsStatusHistory = new DepartmentsStatusHistory()
                {
                    Action = "Update",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = 1,
                    DepartmentId = departmentDTO.DepartmentId
                };
                _context.DepartmentsStatusHistories.Add(departmentsStatusHistory);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {


                return StatusCode(500, "Lỗi máy chủ");

            }

            return Ok("Chỉnh sửa phòng ban thành công");
        }
        [Authorize(Roles = "ListDepartment")]
        // POST: api/Departments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public IActionResult CreateDepartment(string departmentName)
        {
            if (_context.Departments == null)
            {
                return Problem("Dữ liệu rỗng");
            }
            try
            {
                DepartmentDTO departmentDTO = new DepartmentDTO()
                {
                    DepartmentId = 0,
                    DepartmentName = departmentName,
                    Status = true
                };
                var department = _mapper.Map<Department>(departmentDTO);
                _context.Departments.Add(department);
                _context.SaveChanges();
                DepartmentsStatusHistory departmentsStatusHistory = new DepartmentsStatusHistory()
                {
                    Action = "Insert",
                    ActionDate = DateTime.Now,
                    CurrentEmployeeId = 1,
                    DepartmentId = department.DepartmentId
                };
                _context.DepartmentsStatusHistories.Add(departmentsStatusHistory);
                _context.SaveChanges();
                return Ok("Tạo phòng ban thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");
            }



        }
        [Authorize(Roles = "ListDepartment")]
        // DELETE: api/Departments/5
        [HttpPut("{id}")]
        public IActionResult UpdateDepartmentStatus(int id)
        {
            try
            {
                if (_context.Departments == null)
                {
                    return NotFound("Không tìm thấy dữ liệu");
                }
                Department department = _context.Departments.Include(de => de.RolesEmployees).SingleOrDefault(e => e.DepartmentId == id);
                DepartmentsStatusHistory departmentsStatusHistory = new DepartmentsStatusHistory();
                if (department == null)
                {
                    return NotFound();
                }
                else
                {
                    if (department.Status == true)
                    {
                        departmentsStatusHistory.DepartmentId = id;
                        departmentsStatusHistory.Action = "Deactive";
                        departmentsStatusHistory.ActionDate = DateTime.Now;
                        departmentsStatusHistory.CurrentEmployeeId = 1;
                        department.Status = false;
                    }
                    else
                    {
                        departmentsStatusHistory.DepartmentId = id;
                        departmentsStatusHistory.Action = "Active";
                        departmentsStatusHistory.ActionDate = DateTime.Now;
                        departmentsStatusHistory.CurrentEmployeeId = 1;
                        department.Status = true;
                    }

                    _context.Departments.Update(department);
                }

                _context.DepartmentsStatusHistories.Add(departmentsStatusHistory);
                _context.SaveChangesAsync();

                return Ok("Chuyển trạng thái phòng ban thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }

        [Authorize(Roles = "ListDepartment")]
        [HttpGet("DepartmentDetail/{id}")]
        public IActionResult GetEmployeeInDepartment(int id)
        {
            try
            {

                var employeelist = _context.Employees
                    .Include(x => x.Country)
                    .Include(emp => emp.RolesEmployees)
                    .ThenInclude(roleemp => roleemp.Role)
                    .Where(re => re.RolesEmployees.Any(re => re.DepartmentId == id && re.EndDate == null))
                    .Select(emp => new EmployeeListDTO
                    {
                        EmployeeID = emp.EmployeeId,
                        Image = emp.Image,
                        FullName = $"{emp.LastName} {emp.FirstName}",
                        Gender = (bool)emp.Gender ? "Nam" : "Nữ",
                        PhoneNumber = emp.PhoneNumber,
                        Roles = emp.RolesEmployees
                        .Where(re => re.EndDate == null)
                        .OrderByDescending(re => re.Role.RoleLevel)
                        .Select(re => re.Role.RoleName)
                        .FirstOrDefault(),
                        Status = emp.Status,
                    });
                return Ok(employeelist);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
        [Authorize(Roles = "ListDepartment")]
        [HttpPost("search")]
        public ActionResult<DepartmentListDTO> SearchAndFilterDepartment(DepartmentDTO departmentDTO)
        {
            if (departmentDTO == null || _context.Departments == null)
            {
                return BadRequest("Lỗi dữ liệu");
            }

            var listDepartment = _context.Departments.Include(de => de.RolesEmployees).ThenInclude(de => de.Employee).ToList().AsQueryable();

            if (!string.IsNullOrEmpty(departmentDTO.DepartmentName))
            {
                string searchTerm = departmentDTO.DepartmentName.ToLower().Normalize(NormalizationForm.FormD);
                listDepartment = listDepartment.Where(ld => ld.DepartmentName.ToLower().Normalize(NormalizationForm.FormD).Contains(searchTerm));
            }

            if (departmentDTO.Status.HasValue)
            {
                listDepartment = listDepartment.Where(ld => ld.Status == departmentDTO.Status);
            }

            var departmentDTOs = _mapper.Map<List<DepartmentListDTO>>(listDepartment);

            return Ok(departmentDTOs);
        }
        //[HttpPost]
        //private string RemoveDiacritics(string text)
        //{
        //    string normalizedText = text.Normalize(NormalizationForm.FormD);
        //    StringBuilder result = new StringBuilder();

        //    foreach (char c in normalizedText)
        //    {
        //        if (CharUnicodeInfo.GetUnicodeCategory(c) != UnicodeCategory.NonSpacingMark)
        //        {
        //            result.Append(c);
        //        }
        //    }

        //    return result.ToString();
        //}

    }
}
