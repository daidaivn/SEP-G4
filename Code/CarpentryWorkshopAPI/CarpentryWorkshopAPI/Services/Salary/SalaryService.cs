using AutoMapper;
using CarpentryWorkshopAPI.IServices.ISalary;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Services.Salary
{
    public class SalaryService : ISalaryService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public SalaryService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public dynamic GetAllSalarys(int month, int year)
        {
            var maxEmployeeId = _context.Employees.Max(emp => emp.EmployeeId);
            var employeeIdLength = maxEmployeeId.ToString().Length;
            var result = new List<Object>();
            var allsalarys = _context.Employees
                .Where(x => x.Status == true)
                .Include(x => x.Contracts)
                .Include(x => x.EmployeesAllowances)
                .ThenInclude(ea => ea.AllowanceType)
                .ThenInclude(at => at.Allowance)
                .ToList();
            foreach (var item in allsalarys)
            {
                var mainsalary = _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == item.EmployeeId && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .Sum(h => h.DailyRate.GetValueOrDefault());
                var basicsalary = _context.Contracts
                                .Where(c => c.EmployeeId == item.EmployeeId && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                                .Select(c => c.Amount).FirstOrDefault();
                if (basicsalary == null)
                {
                    basicsalary = 0;
                }
                var totaltaxpercen = _context.DeductionsDetails                           
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == true)
                                 .Sum(d => d.Percentage);
                var deductionnotax = _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == false)
                                 .Sum(d => d.Percentage);
                var totaldependent = _context.Dependents
                                     .Where(x => x.EmployeeId == item.EmployeeId)
                                     .Count();
                var allowance = item.EmployeesAllowances
                                 .Where(ea => ea.AllowanceType.Allowance.Status == true)
                                 .Sum(ea => ea.AllowanceType.Amount);
                if (allowance == null)
                {
                    allowance = 0;
                }
                var minustaxSalary = mainsalary - basicsalary * (decimal)totaltaxpercen + allowance;
                var taxsalary = minustaxSalary - 11000000 - 4400000 * totaldependent;
                var personaltax = 0.00;
                if (taxsalary > 0)
                {
                    if (taxsalary <= 5000000)
                    {
                        personaltax = 0.05 * (double)taxsalary ;
                    }
                    else if (taxsalary > 5000000 && taxsalary <= 10000000)
                    {
                        personaltax = 250000 + (double)(taxsalary - 5000000) * 0.1;
                    }else if (taxsalary > 10000000 && taxsalary <= 18000000)
                    {
                        personaltax = (double)taxsalary * 0.15 - 750000;
                    }else if (taxsalary > 18000000 && taxsalary <= 32000000)
                    {
                        personaltax = (double)taxsalary * 0.2 - 1650000;
                    }else if (taxsalary > 32000000 && taxsalary <= 52000000)
                    {
                        personaltax = (double)taxsalary * 0.25 - 3250000;
                    }else if (taxsalary > 52000000 && taxsalary <= 80000000)
                    {
                        personaltax = (double)taxsalary * 0.3 - 5850000;
                    }
                    else
                    {
                        personaltax = (double)taxsalary * 0.35 - 9850000;
                    }
                }
                
                var deductions = totaltaxpercen * (double)basicsalary;
               
                if (deductions == null)
                {
                    deductions = 0;
                }
                result.Add(new
                {
                    EmployeeID = item.EmployeeId,
                    EmployeeIDstring = item.EmployeeId.ToString($"D{employeeIdLength}"),
                    MainSalary = mainsalary,
                    Allowances = allowance,
                    Deductions = deductions + personaltax,
                    ActualSalary = mainsalary - (decimal)deductions + allowance - (decimal)personaltax - (decimal)deductionnotax * basicsalary
                });
            }
            
            return result;
        }
        public dynamic GetEmployeeSalaryDetail(int employeeid, int month, int year)
        {
            var result = new List<Object>();
            var mainsalary = _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .Sum(h => h.DailyRate.GetValueOrDefault());
            var basicsalary = _context.Contracts
                               .Where(c => c.EmployeeId == employeeid && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                               .Select(c => c.Amount).FirstOrDefault();
            if (basicsalary == null)
            {
                basicsalary = 0;
            }
            var totaltaxpercen = _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Where(x => x.DeductionType.Status == true)
                             .Sum(d => d.Percentage);
            var deductionnotax = _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == false)
                                 .Sum(d => d.Percentage);
            var totaldependent = _context.Dependents
                                    .Where(x => x.EmployeeId == employeeid)
                                    .Count();
            var allowance = _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid && x.AllowanceType.Allowance.Status == true)
                                 .Sum(ea => ea.AllowanceType.Amount);
            if (allowance == null)
            {
                allowance = 0;
            }
            var minustaxSalary = mainsalary - basicsalary * (decimal)totaltaxpercen + allowance;
            var taxsalary = minustaxSalary - 11000000 - 4400000 * totaldependent;
            var personaltax = 0.00;
            if (taxsalary > 0)
            {
                if (taxsalary <= 5000000)
                {
                    personaltax = 0.05 * (double)taxsalary;
                }
                else if (taxsalary > 5000000 && taxsalary <= 10000000)
                {
                    personaltax = 250000 + (double)(taxsalary - 5000000) * 0.1;
                }
                else if (taxsalary > 10000000 && taxsalary <= 18000000)
                {
                    personaltax = (double)taxsalary * 0.15 - 750000;
                }
                else if (taxsalary > 18000000 && taxsalary <= 32000000)
                {
                    personaltax = (double)taxsalary * 0.2 - 1650000;
                }
                else if (taxsalary > 32000000 && taxsalary <= 52000000)
                {
                    personaltax = (double)taxsalary * 0.25 - 3250000;
                }
                else if (taxsalary > 52000000 && taxsalary <= 80000000)
                {
                    personaltax = (double)taxsalary * 0.3 - 5850000;
                }
                else
                {
                    personaltax = (double)taxsalary * 0.35 - 9850000;
                }
            }
            var deductions = totaltaxpercen * (double)basicsalary;
            if (deductions == null)
            {
                deductions = 0;
            }
            var allowances = _context.EmployeesAllowances
                .Include(x => x.AllowanceType)
                .ThenInclude(at => at.Allowance)
                .Where(x => x.EmployeeId == employeeid)
                .Select(al => new
                {
                    AllowanceName = al.AllowanceType.Allowance.Name,
                    Amounts = al.AllowanceType.Amount
                });
            var bonus = _context.BonusDetails
                .Include(x => x.Employee)
                .Where(x => x.Employee.EmployeeId == employeeid)
                .Select(x => new
                {
                    BonusNames = x.BonusName, 
                    Amounts = x.BonusAmount
                });
            result.Add(new
            {
                MainSalary = mainsalary,
                AllowanceDetails = allowances,
                Bonus = bonus,
                ActualSalary = mainsalary - (decimal)deductions + allowance - (decimal)personaltax - (decimal)deductionnotax * basicsalary
            });
            return result;

        }
        public dynamic GetEmployeeAllowanceDetail(int employeeid, int month, int year)
        {
            var allowances = _context.EmployeesAllowances
               .Include(x => x.AllowanceType)
               .ThenInclude(at => at.Allowance)
               .Where(x => x.EmployeeId == employeeid)
               .Select(al => new
               {
                   AllowanceName = al.AllowanceType.Allowance.Name,
                   Amounts = al.AllowanceType.Amount
               });
            return allowances;
        }
        public dynamic GetEmployeeMainSalaryDetail(int employeeid, int month, int year)
        {
            var mainsalary = _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .Sum(h => h.DailyRate.GetValueOrDefault());
            var result = new List<Object>();
            result.Add(new
            {
                MainSalaryName = "Lương chính",
                Amounts = mainsalary
            }) ;
            return result;
        }
        public dynamic GetEmployeeDeductionDetail(int employeeid, int month, int year)
        {
            var mainsalary = _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .Sum(h => h.DailyRate.GetValueOrDefault());
            var basicsalary = _context.Contracts
                                .Where(c => c.EmployeeId == employeeid && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                                .Select(c => c.Amount).FirstOrDefault();
            var types = _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .ToList();
            if (basicsalary == null)
            {
                basicsalary = 0;
            }
            var totaltaxpercen = _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Where(x => x.DeductionType.Status == true)
                             .Sum(d => d.Percentage);
            var totaldependent = _context.Dependents
                                 .Where(x => x.EmployeeId == employeeid)
                                 .Count();
            var allowance = _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid && x.AllowanceType.Allowance.Status == true)
                                 .Sum(ea => ea.AllowanceType.Amount);
            if (allowance == null)
            {
                allowance = 0;
            }
            var minustaxSalary = mainsalary - basicsalary * (decimal)totaltaxpercen + allowance;
            var taxsalary = minustaxSalary - 11000000 - 4400000 * totaldependent;
            var personaltax = 0.00;
            if (taxsalary > 0)
            {
                if (taxsalary <= 5000000)
                {
                    personaltax = 0.05 * (double)taxsalary;
                }
                else if (taxsalary > 5000000 && taxsalary <= 10000000)
                {
                    personaltax = 250000 + (double)(taxsalary - 5000000) * 0.1;
                }
                else if (taxsalary > 10000000 && taxsalary <= 18000000)
                {
                    personaltax = (double)taxsalary * 0.15 - 750000;
                }
                else if (taxsalary > 18000000 && taxsalary <= 32000000)
                {
                    personaltax = (double)taxsalary * 0.2 - 1650000;
                }
                else if (taxsalary > 32000000 && taxsalary <= 52000000)
                {
                    personaltax = (double)taxsalary * 0.25 - 3250000;
                }
                else if (taxsalary > 52000000 && taxsalary <= 80000000)
                {
                    personaltax = (double)taxsalary * 0.3 - 5850000;
                }
                else
                {
                    personaltax = (double)taxsalary * 0.35 - 9850000;
                }
            }
            var result = new List<Object>();
            foreach (var item in types)
            {
                result.Add(new
                {
                    DeductionNames = item.DeductionType.Name,
                    Amounts = basicsalary * (decimal)item.Percentage
                });
            }
            result.Add(new
            {
                DeductionNames = "Thuế thu nhập cá nhân",
                Amounts = personaltax
            });
            return result;
        }
        public dynamic GetEmployeeActualSalaryDetail(int employeeid, int month, int year)
        {
            var mainsalary = _context.HoursWorkDays
                                       .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                       .Sum(h => h.DailyRate.GetValueOrDefault());
            var basicsalary = _context.Contracts
                            .Where(c => c.EmployeeId == employeeid && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                            .Select(c => c.Amount).FirstOrDefault();
            if (basicsalary == null)
            {
                basicsalary = 0;
            }
            var totaltaxpercen = _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Where(x => x.DeductionType.Status == true)
                             .Sum(d => d.Percentage);
            var deductionnotax = _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == false)
                                 .Sum(d => d.Percentage);
            var totaldependent = _context.Dependents
                                 .Where(x => x.EmployeeId == employeeid)
                                 .Count();
            var allowance = _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid && x.AllowanceType.Allowance.Status == true)
                                 .Sum(ea => ea.AllowanceType.Amount);
            if (allowance == null)
            {
                allowance = 0;
            }
            var minustaxSalary = mainsalary - basicsalary * (decimal)totaltaxpercen + allowance;
            var taxsalary = minustaxSalary - 11000000 - 4400000 * totaldependent;
            var personaltax = 0.00;
            if (taxsalary > 0)
            {
                if (taxsalary <= 5000000)
                {
                    personaltax = 0.05 * (double)taxsalary;
                }
                else if (taxsalary > 5000000 && taxsalary <= 10000000)
                {
                    personaltax = 250000 + (double)(taxsalary - 5000000) * 0.1;
                }
                else if (taxsalary > 10000000 && taxsalary <= 18000000)
                {
                    personaltax = (double)taxsalary * 0.15 - 750000;
                }
                else if (taxsalary > 18000000 && taxsalary <= 32000000)
                {
                    personaltax = (double)taxsalary * 0.2 - 1650000;
                }
                else if (taxsalary > 32000000 && taxsalary <= 52000000)
                {
                    personaltax = (double)taxsalary * 0.25 - 3250000;
                }
                else if (taxsalary > 52000000 && taxsalary <= 80000000)
                {
                    personaltax = (double)taxsalary * 0.3 - 5850000;
                }
                else
                {
                    personaltax = (double)taxsalary * 0.35 - 9850000;
                }
            }
            var deductions = totaltaxpercen * (double)basicsalary;
            if (allowance == null)
            {
                allowance = 0;
            }
            if (deductions == null)
            {
                deductions = 0;
            }
            var result = new List<Object>();
            result.Add(new
            {
                ActualSalaryName = "Lương thực nhận",
                Amounts = mainsalary - (decimal)deductions + allowance - (decimal)personaltax - (decimal)deductionnotax * basicsalary
            });
            return result;
           
        }
    }
}
