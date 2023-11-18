using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Services.Salary
{
    public class SalaryService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public SalaryService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public dynamic GetAllSalarys()
        {
            var allsalarys = _context.Employees
                .Include(x => x.Salaries)
                .Include(x => x.BonusDetails)
                .Include(x => x.SpecialOccasions)
                .Include(x => x.Subsidies)
                .Include(x => x.EmployeesAllowances)
                .ThenInclude(ea => ea.AllowanceType)
                .ThenInclude(at => at.Allowance)
                .Select(s => new
                {
                    MainSalary = s.Salaries
                        .OrderByDescending(sa => sa.PayDate)
                        .Where(sa => sa.EmployeeId == s.EmployeeId)
                        .Select(sa => sa.TotalSalary)
                        .FirstOrDefault(),
                    Subsidys = s.SpecialOccasions
                        .OrderByDescending(so => so.OccasionDate)
                        .Where(so => so.EmployeeId == s.EmployeeId)
                        .Select(so => so.Amount)
                        .FirstOrDefault(),
                    Bonus = s.BonusDetails
                        .OrderByDescending(bd => bd.BonusDate)
                        .Where(bd => bd.EmployeeId == s.EmployeeId)
                        .Select(bd => bd.BonusAmount)
                        .FirstOrDefault(),

                });
            return "";
        }
    }
}
