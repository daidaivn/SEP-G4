using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IAdvance;
using CarpentryWorkshopAPI.Models;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography.Xml;
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
                .Select(a => new
                {
                    AdvanceSalaryID = a.AdvanceSalaryId,
                    EmployeeID = a.EmployeeId,
                    EmployeeIdstring = a.EmployeeId.ToString().PadLeft(employeeIdLength, '0'),
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
                .Where(x => x.AdvanceSalaryId == advanceSalaryId)
                .Select(x => new
                {
                    AdvanceSalaryID = x.AdvanceSalaryId,
                    EmployeeID = x.EmployeeId,
                    EmployeeIdstring = x.EmployeeId.ToString().PadLeft(employeeIdLength, '0'),
                    EmployeeName = x.Employee.FirstName + " " + x.Employee.LastName,
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
                .Where(x => x.EmployeeId == eid)
                .Select(x => new 
                { 
                    EmployeeID = x.EmployeeId,
                    EmployeeName = x.FirstName + " " + x.LastName 
                })
                .FirstOrDefaultAsync();
            return employee;
        } 
        public async Task<dynamic> CreateAdvance([FromBody] CreateAdvanceDTO createAdvanceDTO)
        {
            //var startDate = new DateTime(createAdvanceDTO.my.Year, createAdvanceDTO.my.Month, 1);
            //var endDate = startDate.AddMonths(1).AddDays(-1);
            //var holidays = await _context.HolidaysDetails
            //                     .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
            //                     .Select(h => h.Date.Value)
            //                     .ToListAsync();
            //var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time");
            //var employee = await _context.Employees
            //    .Include(x => x.HoursWorkDays)
            //    .Where(x => x.EmployeeId == createAdvanceDTO.EmployeeId)
            //    .FirstOrDefaultAsync();
            //var employeeWorkingDay = employee.HoursWorkDays
            //    .Count(hwd => hwd.Day.HasValue &&
            //                  TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
            //                  !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));
        
            //if (employeeWorkingDay < 13)
            //{
            //    return StatusCode(409,)
            //}
            var newAdvance = _mapper.Map<AdvancesSalary>(createAdvanceDTO);
            await _context.AdvancesSalaries.AddAsync(newAdvance);
            await _context.SaveChangesAsync();
            return "Create advance salary successful";
        }
        public async Task<dynamic> UpdateAdvance([FromBody] CreateAdvanceDTO createAdvanceDTO)
        {
            var updateAdvance = _mapper.Map<AdvancesSalary>(createAdvanceDTO);
            _context.AdvancesSalaries.Update(updateAdvance);
            _context.SaveChanges();
            return "Update advance salary successful";
        }
    }
}
