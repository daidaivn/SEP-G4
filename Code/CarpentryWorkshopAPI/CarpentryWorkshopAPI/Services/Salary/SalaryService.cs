using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalary;
using CarpentryWorkshopAPI.Models;
using DocumentFormat.OpenXml.Bibliography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

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

        public async Task<dynamic> GetAllSalarys(GetSalarysDTO getSalarysDTO)
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
                .ToList()
                .AsQueryable();
                
            if (!string.IsNullOrEmpty(getSalarysDTO.InputText))
            {
                var input = getSalarysDTO.InputText.ToLower().Normalize(NormalizationForm.FormD);
                allsalarys = allsalarys.Where(x =>
                    x.FirstName.ToLower().Normalize(NormalizationForm.FormD).Contains(input) ||
                    x.LastName.ToLower().Normalize(NormalizationForm.FormD).Contains(input) 
                );
            }
            if (getSalarysDTO.month != 0 && getSalarysDTO.year != 0)
            {
                allsalarys = allsalarys.Where(e => e.Contracts.Any(c =>
                        c.StartDate.HasValue &&
                        c.EndDate.HasValue &&
                (
                            (c.StartDate.Value.Year < getSalarysDTO.year) ||
                (c.StartDate.Value.Year == getSalarysDTO.year && c.StartDate.Value.Month <= getSalarysDTO.month)
                ) &&
                (
                            (c.EndDate.Value.Year > getSalarysDTO.year) ||
                (c.EndDate.Value.Year == getSalarysDTO.year && c.EndDate.Value.Month >= getSalarysDTO.month)
                )
                ));
            }
            foreach (var item in allsalarys)
            {
                var mainsalary = await _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == item.EmployeeId && h.Day.HasValue && h.Day.Value.Month == getSalarysDTO.month 
                                        && h.Day.Value.Year == getSalarysDTO.year)
                                        .SumAsync(h => h.DailyRate.GetValueOrDefault());
                var basicsalary = await _context.Contracts
                                .Where(c => c.EmployeeId == item.EmployeeId && c.StartDate.HasValue && c.StartDate.Value.Month <= getSalarysDTO.month 
                                && c.StartDate.Value.Year <= getSalarysDTO.year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month 
                                >= getSalarysDTO.month && c.EndDate.Value.Year >= getSalarysDTO.year)))
                                .Select(c => c.Amount).FirstOrDefaultAsync();
                if (basicsalary == null)
                {
                    basicsalary = 0;
                }
                var bonus = await _context.BonusDetails
                    .Where(b => b.EmployeeId == item.EmployeeId && b.BonusDate.HasValue && b.BonusDate.Value.Month == getSalarysDTO.month
                    && b.BonusDate.Value.Year == getSalarysDTO.year)
                    .SumAsync(b => b.BonusAmount.GetValueOrDefault());
                var special = await _context.SpecialOccasions
                    .Where(b => b.EmployeeId == item.EmployeeId && b.OccasionDate.HasValue && b.OccasionDate.Value.Month == getSalarysDTO.month
                    && b.OccasionDate.Value.Year == getSalarysDTO.year)
                    .SumAsync(b => b.Amount.GetValueOrDefault());

                var totaltaxpercen = await _context.DeductionsDetails                           
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == true)
                                 .SumAsync(d => d.Percentage);
                var deductionnotax = await _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == false)
                                 .SumAsync(d => d.Percentage);
                var totaldependent = await _context.Dependents
                                     .Where(x => x.EmployeeId == item.EmployeeId)
                                     .CountAsync();
                var allowance =  item.EmployeesAllowances
                                 .Where(ea => ea.AllowanceType.Allowance.Status == true)
                                 .Sum(ea => ea.AllowanceType.Amount);
                var totalAllowance = item.EmployeesAllowances
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
                    EmployeeName = item.LastName + " " + item.FirstName,
                    EmployeeIDstring = item.EmployeeId.ToString($"D{employeeIdLength}"),
                    MainSalary = mainsalary,
                    Allowances = totalAllowance,
                    Deductions = deductions + personaltax,
                    ActualSalary = mainsalary - (decimal)deductions + totalAllowance + bonus + special - (decimal)personaltax - (decimal)deductionnotax * basicsalary
                });
            }
            
            return result;
        }
        public async Task<dynamic> GetEmployeeSalaryDetail(int employeeid, int month, int year)
        {
            var result = new List<Object>();
            var mainsalary = await _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .SumAsync(h => h.DailyRate.GetValueOrDefault());
            var basicsalary = await _context.Contracts
                               .Where(c => c.EmployeeId == employeeid && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                               .Select(c => c.Amount).FirstOrDefaultAsync();
            if (basicsalary == null)
            {
                basicsalary = 0;
            }
            var totaltaxpercen = await _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Where(x => x.DeductionType.Status == true)
                             .SumAsync(d => d.Percentage);
            var deductionnotax = await _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == false)
                                 .SumAsync(d => d.Percentage);
            var totaldependent = await _context.Dependents
                                    .Where(x => x.EmployeeId == employeeid)
                                    .CountAsync();
            var allowance = await _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid && x.AllowanceType.Allowance.Status == true)
                                 .SumAsync(ea => ea.AllowanceType.Amount);
            var totalAllowance = await _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid)
                                 .SumAsync(ea => ea.AllowanceType.Amount);
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
            var allowances = await _context.EmployeesAllowances
                .Include(x => x.AllowanceType)
                .ThenInclude(at => at.Allowance)
                .Where(x => x.EmployeeId == employeeid)
                .Select(al => new
                {
                    AllowanceName = al.AllowanceType.Allowance.Name,
                    Amounts = al.AllowanceType.Amount
                }).ToListAsync();
            var bonus = await _context.BonusDetails
                .Include(x => x.Employee)
                .Where(x => x.Employee.EmployeeId == employeeid)
                .Select(x => new
                {
                    BonusNames = x.BonusName, 
                    Amounts = x.BonusAmount
                }).ToListAsync();
            var totalbonus = await _context.BonusDetails
                   .Where(b => b.EmployeeId == employeeid && b.BonusDate.HasValue && b.BonusDate.Value.Month == month
                   && b.BonusDate.Value.Year == year)
                   .SumAsync(b => b.BonusAmount.GetValueOrDefault());
            var totalspecial = await _context.SpecialOccasions
                .Where(b => b.EmployeeId == employeeid && b.OccasionDate.HasValue && b.OccasionDate.Value.Month == month
                && b.OccasionDate.Value.Year == year)
                .SumAsync(b => b.Amount.GetValueOrDefault());
            result.Add(new
            {
                MainSalary = mainsalary,
                AllowanceDetails = allowances,
                Bonus = bonus,
                ActualSalary = mainsalary - (decimal)deductions + totalAllowance + totalbonus + totalspecial - (decimal)personaltax - (decimal)deductionnotax * basicsalary
            });
            return result;

        }
        public async Task<dynamic> GetEmployeeAllowanceDetail(int employeeid, int month, int year)
        {
            var allowances = await _context.EmployeesAllowances
               .Include(x => x.AllowanceType)
               .ThenInclude(at => at.Allowance)
               .Where(x => x.EmployeeId == employeeid)
               .Select(al => new
               {
                   AllowanceName = al.AllowanceType.Allowance.Name,
                   Amounts = al.AllowanceType.Amount
               }).ToListAsync();
            decimal? totalAmount = allowances.Sum(a => a.Amounts);
            var result = new List<Object>();
            result.Add(new
            {
                Allowances = allowances,
                TotalAmount = totalAmount,
            });
            return result;
        }
        public async Task<dynamic> GetEmployeeMainSalaryDetail(int employeeid, int month, int year)
        {
            var mainsalary = await _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .SumAsync(h => h.DailyRate.GetValueOrDefault());
            var result = new List<Object>();
            result.Add(new
            {
                MainSalaryName = "Lương chính",
                Amounts = mainsalary
            }) ;
            return result;
        }
        public async Task<dynamic> GetEmployeeDeductionDetail(int employeeid, int month, int year)
        {
            var mainsalary = await _context.HoursWorkDays
                                        .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                        .SumAsync(h => h.DailyRate.GetValueOrDefault());
            var basicsalary = await _context.Contracts
                                .Where(c => c.EmployeeId == employeeid && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                                .Select(c => c.Amount).FirstOrDefaultAsync();          
            if (basicsalary == null)
            {
                basicsalary = 0;
            }
            var totaltaxpercen = await _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Where(x => x.DeductionType.Status == true)
                             .SumAsync(d => d.Percentage);
            var totaldependent = await _context.Dependents
                                 .Where(x => x.EmployeeId == employeeid)
                                 .CountAsync();
            var allowance = await _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid && x.AllowanceType.Allowance.Status == true)
                                 .SumAsync(ea => ea.AllowanceType.Amount);
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
            var types = await _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Select(x => new
                             {
                                 DeductionNames = x.DeductionType.Name,
                                 Amounts = basicsalary * (decimal)x.Percentage
                             })
                             .ToListAsync();
            decimal? totalAmounts = types.Sum(t => t.Amounts);
            result.Add(new
            {
                Deductions = types,
                TotalDeductionAmounts = totalAmounts,
            });
            result.Add(new
            {
                DeductionNames = "Thuế thu nhập cá nhân",
                Amounts = personaltax
            });
            return result;
        }
        public async Task<dynamic> GetEmployeeActualSalaryDetail(int employeeid, int month, int year)
        {
            var mainsalary = await _context.HoursWorkDays
                                       .Where(h => h.EmployeeId == employeeid && h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                       .SumAsync(h => h.DailyRate.GetValueOrDefault());
            var basicsalary = await _context.Contracts
                            .Where(c => c.EmployeeId == employeeid && c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                            .Select(c => c.Amount).FirstOrDefaultAsync();
            if (basicsalary == null)
            {
                basicsalary = 0;
            }
            var totaltaxpercen = await _context.DeductionsDetails
                             .Include(x => x.DeductionType)
                             .Where(x => x.DeductionType.Status == true)
                             .SumAsync(d => d.Percentage);
            var deductionnotax = await _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Status == false)
                                 .SumAsync(d => d.Percentage);
            var totaldependent = await _context.Dependents
                                 .Where(x => x.EmployeeId == employeeid)
                                 .CountAsync();
            var allowance = await _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid && x.AllowanceType.Allowance.Status == true)
                                 .SumAsync(ea => ea.AllowanceType.Amount);
            var totalAllowance = await _context.EmployeesAllowances
                                 .Where(x => x.EmployeeId == employeeid)
                                 .SumAsync(ea => ea.AllowanceType.Amount);
            var bonus = await _context.BonusDetails
                        .Where(b => b.EmployeeId == employeeid && b.BonusDate.HasValue && b.BonusDate.Value.Month == month
                        && b.BonusDate.Value.Year == year)
                        .SumAsync(b => b.BonusAmount.GetValueOrDefault());
            var special = await _context.SpecialOccasions
                        .Where(b => b.EmployeeId == employeeid && b.OccasionDate.HasValue && b.OccasionDate.Value.Month == month
                        && b.OccasionDate.Value.Year == year)
                        .SumAsync(b => b.Amount.GetValueOrDefault());
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
                MainSalaryName = "Lương chính",
                MainSalaryAmount = mainsalary
            });
            result.Add(new
            {
                DeductionName = "Các khoản giảm trừ (tính thuế)",
                DeductionAmount = deductions
            });
            result.Add(new
            {
                AllowanceName = "Phụ cấp",
                AllowanceAmount = totalAllowance
            });
            result.Add(new
            {
                BonusName = "Thưởng",
                BonusAmount = bonus
            });
            result.Add(new
            {
                SpecialName = "Hiếu hỉ",
                SpecialAmount = special
            });
            result.Add(new
            {
                PersonalTaxName = "Thuế thu nhập cá nhân",
                PersonalTaxAmount = personaltax
            });
            result.Add(new
            {
                DeductionName = "Các khoản giảm trừ (không tính thuế)",
                DeductionAmount = (decimal)deductionnotax * basicsalary
            });
            result.Add(new
            {
                TotalName = "Tổng",
                TotalAmount = mainsalary - (decimal)deductions + totalAllowance + bonus + special - (decimal)personaltax - (decimal)deductionnotax * basicsalary
            });
            return result;
           
        }
    }
}

