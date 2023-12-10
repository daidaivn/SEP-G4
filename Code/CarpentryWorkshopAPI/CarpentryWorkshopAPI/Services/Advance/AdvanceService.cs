using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IAdvance;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CarpentryWorkshopAPI.Services.Advance
{
    public class AdvanceService : IAdvanceService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public AdvanceService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<dynamic> GetAllAdvanceSalary([FromBody] SearchAdvanceDTO searchAdvanceDTO)
        {
            var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
            var employeeIdLength = maxEmployeeId.ToString().Length;
            var alladvance = _context.AdvancesSalaries
                .Include(x => x.Employee)
                .ToList()
                .AsQueryable();
            if (!string.IsNullOrEmpty(searchAdvanceDTO.InputText))
            {
                string input = searchAdvanceDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                alladvance = alladvance.Where(x => (x.Employee.FirstName + " " + x.Employee.LastName).ToLower().Normalize(NormalizationForm.FormD).Contains(input)
                || x.EmployeeId.ToString().PadLeft(employeeIdLength, '0').ToLower().Normalize(NormalizationForm.FormD).Contains(input)
                );
            }

            if (searchAdvanceDTO.Year > 0)
            {
                alladvance = alladvance.Where(x => x.Date.Value.Year == searchAdvanceDTO.Year);
            }

            if (searchAdvanceDTO.Month > 0)
            {
                alladvance = alladvance.Where(x => x.Date.Value.Month == searchAdvanceDTO.Month);
            }
            var result = alladvance
                .OrderByDescending(x => x.AdvanceSalaryId)
                .Select(a => new
                {
                    AdvanceSalaryID = a.AdvanceSalaryId,
                    EmployeeID = a.EmployeeId,
                    EmployeeIdstring = a.EmployeeId.ToString().PadLeft(employeeIdLength, '0'),
                    EmployeeName = a.Employee.FirstName + " " + a.Employee.LastName,
                    Amount = a.Amount,
                    Date = a.Date.Value.ToString("dd'-'MM'-'yyyy"),
                    Note = a.Note
                })
                .ToList();
            return result;
        }
        public async Task<dynamic> GetAdvanceDetail(int advanceSalaryId)
        {
            var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
            var employeeIdLength = maxEmployeeId.ToString().Length;
            var advanceDetail = await _context.AdvancesSalaries
                .Include(x => x.Employee)
                .ThenInclude(x => x.Contracts)
                .Where(x => x.AdvanceSalaryId == advanceSalaryId)
                .Select(x => new
                {
                    AdvanceSalaryID = x.AdvanceSalaryId,
                    EmployeeID = x.EmployeeId,
                    EmployeeIdstring = x.EmployeeId.ToString().PadLeft(employeeIdLength, '0'),
                    EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
                    MaxAdvance = x.Employee.Contracts.Where(c => c.EmployeeId == x.EmployeeId).Select(c => (long)c.Amount * 0.3).FirstOrDefault(),
                    Amount = x.Amount,
                    Date = x.Date.Value.ToString("dd'-'MM'-'yyyy"),
                    Note = x.Note
                })
                .FirstOrDefaultAsync();
            return advanceDetail;
        }
        public async Task<dynamic> GetEmployee(string employeeidstring)
        {
            string trimmedEmployeeIdString = employeeidstring.TrimStart('0');
            int eid = Int32.Parse(trimmedEmployeeIdString);
            var employee = await _context.Employees
                .Include(x => x.Contracts)
                .Where(x => x.EmployeeId == eid)
                .Select(x => new
                {
                    EmployeeID = x.EmployeeId,
                    EmployeeName = x.FirstName + " " + x.LastName,
                    MaxAdvance = x.Contracts.Where(c => c.EmployeeId == eid).Select(c => (long)c.Amount * 0.3).FirstOrDefault()
                })
                .FirstOrDefaultAsync();
            return employee;
        }
        public async Task<dynamic> CreateAdvance([FromBody] CreateAdvanceDTO createAdvanceDTO)
        {
            DateTime date = DateTime.Now.Date;
            var newAdvance = _mapper.Map<AdvancesSalary>(createAdvanceDTO);
            newAdvance.Date = date;
            newAdvance.Status = true;
            await _context.AdvancesSalaries.AddAsync(newAdvance);
            await _context.SaveChangesAsync();
            return "Tạo tạm ứng thành công";
        }
        public async Task<dynamic> UpdateAdvance([FromBody] UpdateAdvanceDTO updateAdvanceDTO)
        {
            DateTime date = DateTime.Now.Date;
            var updateAdvance = _mapper.Map<AdvancesSalary>(updateAdvanceDTO);
            updateAdvance.Date = date;
            updateAdvance.Status = true;
            _context.AdvancesSalaries.Update(updateAdvance);
            _context.SaveChanges();
            return "Chỉnh sửa tạm ứng thành công";
        }
    }
}
