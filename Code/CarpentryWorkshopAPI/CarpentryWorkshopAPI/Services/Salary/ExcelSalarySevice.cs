using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.IServices.ISalary;
using AutoMapper;
using OfficeOpenXml;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OfficeOpenXml.Style;
using DocumentFormat.OpenXml.Wordprocessing;
using System.Runtime.CompilerServices;

namespace CarpentryWorkshopAPI.Services.Salary
{
    public class ExcelSalarySevice : IExcelSalarySevice
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;

        public ExcelSalarySevice(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        public async Task<IEnumerable<object>> GetEmployeesByContractDateAsync(int month, int year)
        {
            var timeZone = TimeZoneInfo.FindSystemTimeZoneById("SE Asia Standard Time"); 
            var startDate = new DateTime(year, month, 1);
            var endDate = startDate.AddMonths(1).AddDays(-1);
            var holidays = await FetchHolidaysAsync(startDate, endDate);
            var employees = await _context.Employees
                        .Include(e => e.Contracts)
                        .Include(e => e.EmployeesAllowances)
                        .ThenInclude(ea => ea.AllowanceType)
                        .ThenInclude(at => at.Allowance)
                .Include(e => e.RolesEmployees).ThenInclude(re => re.Role)
                .Include(e => e.HoursWorkDays)
                .Where(e => e.Contracts.Any(c => c.StartDate <= endDate && c.EndDate >= startDate))
                .ToListAsync();

            int sequence = 1;
            var maxEmployeeId = _context.Employees.Max(e => e.EmployeeId);

            return employees.Select(async e =>
            {
                var latestContract = GetLatestContract(e);
                var actualWorkDays = CalculateActualWorkingDays(e, startDate, endDate, holidays, timeZone);
                var overtimeWorkDays = CalculateOvertimeWorkingDays(e, startDate, endDate, holidays, timeZone);
                var workDaysOnHolidays = CalculateWorkingDaysOnHolidays(e, startDate, endDate, holidays, timeZone); 
                var workingDaysInMonth = CalculateWorkingDaysInMonth(month, year, holidays, timeZone);
                var workDayBonus = CalculateWorkDayBonus(e, startDate, endDate);
                var bussinessSalary = CalculateBusinessSalary(e, startDate, endDate);
                if (bussinessSalary == null)
                {
                    bussinessSalary = 0;
                }
                var totalOT = e.HoursWorkDays
                .Where(h => h.Day >= startDate && h.Day <= endDate && h.Day.Value.DayOfWeek == DayOfWeek.Sunday)
                .Sum(h => h.DailyRate) * 2;
                var totalHolidaySalary = e.HoursWorkDays
                .Where(hwd => hwd.Day.HasValue &&
                              holidays.Contains(TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone).Date) &&
                              TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) >= startDate &&
                              TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) <= endDate)
                .Sum(ths => ths.DailyRate) * 3;
                if (totalHolidaySalary == null)
                {
                    totalHolidaySalary= 0;
                }
                if (totalOT == null)
                {
                    totalOT = 0;
                }

                decimal basicSalary = 0;
                decimal dailyWage = 0;
                decimal actualWorkdaySalary = 0;

                string meal = "Tiền ăn ca";
                var mealAllowance = e.EmployeesAllowances
                   .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null 
                   && ea.AllowanceType.Allowance.Name.ToLower().Equals(meal.ToLower()))
                   .Select(ea => ea.AllowanceType.Amount)
                   .FirstOrDefault();
                string clother = "Quần áo";
                var clotherAllowance = e.EmployeesAllowances
                   .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
                   && ea.AllowanceType.Allowance.Name.ToLower().Equals(clother.ToLower()))
                   .Select(ea => ea.AllowanceType.Amount)
                   .FirstOrDefault();
                string car = "Xăng xe";
                var carAllowance = e.EmployeesAllowances
                   .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
                   && ea.AllowanceType.Allowance.Name.ToLower().Equals(car.ToLower()))
                   .Select(ea => ea.AllowanceType.Amount)
                   .FirstOrDefault();
                string social = "BHXH";
                var socialInsurance = await _context.DeductionsDetails
                                     .Include(x => x.DeductionType)
                                     .Where(x => x.DeductionType.Name.ToLower().Equals(social.ToLower()))
                                     .Select(x => x.Percentage)
                                     .FirstOrDefaultAsync();
                string health = "BHYT";
                var healthInsurance = await _context.DeductionsDetails
                                     .Include(x => x.DeductionType)
                                     .Where(x => x.DeductionType.Name.ToLower().Equals(health.ToLower()))
                                     .Select(x => x.Percentage)
                                     .FirstOrDefaultAsync();
                string unemployment = "BHTT";
                var unemploymentInsurance = await _context.DeductionsDetails
                                     .Include(x => x.DeductionType)
                                     .Where(x => x.DeductionType.Name.ToLower().Equals(unemployment.ToLower()))
                                     .Select(x => x.Percentage)
                                     .FirstOrDefaultAsync();
                string union = "BHTT";
                var unionFees = await _context.DeductionsDetails
                                     .Include(x => x.DeductionType)
                                     .Where(x => x.DeductionType.Name.ToLower().Equals(union.ToLower()))
                                     .Select(x => x.Percentage)
                                     .FirstOrDefaultAsync();
                var advances = e.AdvancesSalaries
                         .Where(x => x.EmployeeId == e.EmployeeId && x.Date.Value >= startDate && x.Date.Value <= endDate)
                         .Sum(x => x.Amount);
                if (latestContract != null && (bool)latestContract.IsOffice == true)
                {
                    basicSalary = latestContract.Amount ?? 0;
                    dailyWage = basicSalary / workingDaysInMonth;
                    actualWorkdaySalary = actualWorkDays * dailyWage;
                }
                if(latestContract!= null && (bool)latestContract.IsOffice == false)
                {
                    basicSalary = latestContract.Amount ?? 0;
                    actualWorkdaySalary = e.HoursWorkDays
                    .Where(h => h.Day >= startDate && h.Day <= endDate && h.EmployeeId == e.EmployeeId)
                    .Sum(h => (decimal)(h.DailyRate ?? 0) );
                    
                }
               
                var personalRelief = 11000000.00;
                var totaldependent = e.Dependents.Where(x => x.EmployeeId == e.EmployeeId).Count();
                var dependentRelief = 4400000.00 * totaldependent;
                var totalActualSalary = actualWorkdaySalary + totalHolidaySalary + totalOT + mealAllowance + clotherAllowance + carAllowance + bussinessSalary;
                var taxableIncome = totalActualSalary - mealAllowance - clotherAllowance;
                var totalInsurance = (decimal)(socialInsurance + healthInsurance + unemploymentInsurance) * basicSalary;
                var totalRelief = (decimal)personalRelief + (decimal)dependentRelief;
                var incometax = taxableIncome - totalInsurance - totalRelief;
                if (incometax < 0)
                {
                    incometax = 0;
                }
                var personIncome = CalculatePersonalIncomeTax((decimal)incometax);
                if (personIncome == null)
                {
                    personIncome = 0;
                }
                return new
                {
                    EmployeeId = e.EmployeeId.ToString().PadLeft(maxEmployeeId.ToString().Length, '0'),
                    OrderNumber = sequence++,
                    FullName = e.LastName + " " + e.FirstName,
                    Position = e.RolesEmployees.OrderByDescending(re => re.Role.RoleLevel).FirstOrDefault()?.Role.RoleName ?? "No Role",
                    Location = latestContract != null && (bool)latestContract.IsOffice ? "VP" : "SX",
                    Gender = (bool)e.Gender ? "Nam" : "Nữ",
                    ActualWork = actualWorkDays,
                    HolidayWork = workDaysOnHolidays,
                    Overtime = workDayBonus,                   
                    BasicSalary = basicSalary,
                    InsuranceSalary = basicSalary,
                    ActualDaySalary = actualWorkdaySalary,
                    OverTimeSalary = totalHolidaySalary + totalOT,
                    Allowances = new
                    {
                        Meal = mealAllowance,
                        Uniform = clotherAllowance,
                        Petrol = carAllowance
                    },
                    BusinessSalary = bussinessSalary,
                    TotalActualSalary = totalActualSalary,
                    Deductions = new
                    {
                        SocialInsurance = (decimal)socialInsurance * basicSalary,
                        HealthInsurance = (decimal)healthInsurance * basicSalary,
                        UnemploymentInsurance = (decimal)unemploymentInsurance * basicSalary,
                        UnionFees = (decimal)unionFees * basicSalary
                    },
                    TaxableIncome = taxableIncome,
                    TaxDeductions = new
                    {
                        PersonalRelief = personalRelief,
                        DependentRelief = dependentRelief,
                        Insurance = totalInsurance
                    },
                    IncomeTax = incometax, 
                    PersonalIncomeTax = personIncome,
                    Advances = advances,
                    ActualReceived = totalActualSalary - totalInsurance - personIncome - (decimal)unionFees * basicSalary

                };
            });
        }

        private int CalculateWorkDayBonus(Employee employee, DateTime startDate, DateTime endDate)
        {
            var workDaysOnSundays = employee.HoursWorkDays
                .Where(h => h.Day >= startDate && h.Day <= endDate && h.Day.Value.DayOfWeek == DayOfWeek.Sunday)
                .Count();

            return workDaysOnSundays;
        }
        private decimal? CalculateBusinessSalary(Employee employee, DateTime startDate, DateTime endDate)
        {
            var business = employee.HoursWorkDays
                .Where(h => h.Day >= startDate && h.Day <= endDate)
                .Sum(h => h.DailyRate);

            return business;
        }
        private int CalculateWorkingDaysInMonth(int month, int year, List<DateTime> holidays, TimeZoneInfo timeZone)
        {
            var startDate = new DateTime(year, month, 1);
            var endDate = new DateTime(year, month, DateTime.DaysInMonth(year, month));
            int workingDays = 0;

            for (var date = startDate; date <= endDate; date = date.AddDays(1))
            {
                var zonedDate = TimeZoneInfo.ConvertTimeFromUtc(date, timeZone);

                // Check if the day is not a Sunday and not a holiday
                if (zonedDate.DayOfWeek != DayOfWeek.Sunday && !holidays.Any(holiday => TimeZoneInfo.ConvertTimeFromUtc(holiday, timeZone).Date == zonedDate.Date))
                {
                    workingDays++;
                }
            }

            return workingDays;
        }


        private Contract GetLatestContract(Employee employee)
        {
            return employee.Contracts.OrderByDescending(c => c.EndDate).FirstOrDefault();
        }
        private int CalculateWorkingDays(Employee employee, DateTime startDate, DateTime endDate, List<DateTime> holidays)
        {
            return employee.HoursWorkDays
                .Count(hwd => hwd.Day.HasValue &&
                              hwd.Day.Value >= startDate && hwd.Day.Value <= endDate &&
                              hwd.Day.Value.DayOfWeek != DayOfWeek.Sunday &&
                              !holidays.Contains(hwd.Day.Value));
        }
        private async Task<List<DateTime>> FetchHolidaysAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.HolidaysDetails
                                 .Where(h => h.Date.HasValue && h.Date.Value >= startDate && h.Date.Value <= endDate)
                                 .Select(h => h.Date.Value)
                                 .ToListAsync();
        }

        private int CalculateWorkingDaysOnHolidays(Employee employee, DateTime startDate, DateTime endDate, List<DateTime> holidays, TimeZoneInfo timeZone)
        {
            return employee.HoursWorkDays
                .Count(hwd => hwd.Day.HasValue &&
                              holidays.Contains(TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone).Date) &&
                              TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) >= startDate &&
                              TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) <= endDate);
        }

        private int CalculateActualWorkingDays(Employee employee, DateTime startDate, DateTime endDate, List<DateTime> holidays, TimeZoneInfo timeZone)
        {
            return employee.HoursWorkDays
                .Count(hwd => hwd.Day.HasValue &&
                              TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek != DayOfWeek.Sunday &&
                              !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));
        }

        private int CalculateOvertimeWorkingDays(Employee employee, DateTime startDate, DateTime endDate, List<DateTime> holidays, TimeZoneInfo timeZone)
        {
            return employee.HoursWorkDays
                .Count(hwd => hwd.Day.HasValue &&
                              TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).DayOfWeek == DayOfWeek.Sunday &&
                              !holidays.Contains(TimeZoneInfo.ConvertTimeFromUtc(hwd.Day.Value, timeZone).Date));
        }


        private decimal CalculatePersonalIncomeTax(decimal income)
        {
            if (income <= 5000000)
                return income * 0.05m;
            else if (income <= 10000000)
                return income * 0.10m;
            else if (income <= 18000000)
                return income * 0.15m;
            else if (income <= 32000000)
                return income * 0.20m;
            else if (income <= 52000000)
                return income * 0.25m;
            else if (income <= 80000000)
                return income * 0.30m;
            else
                return income * 0.35m;
        }

        public async Task<MemoryStream> GenerateSalaryExcel(int month, int year)
        {

            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

            //Truy vấn danh sách employee có trạng thái là true
            var employeeIds = await _context.Employees.Where(em => em.Status == true).Select(e => e.EmployeeId).ToListAsync();
            var monthStart = new DateTime(year, month, 1);
            var monthEnd = monthStart.AddMonths(1).AddDays(-1);

            //Tuy vấn vai trò nhân viên theo theo chức vụ cao nhất
            var roles = await _context.RolesEmployees
                        .Where(r => r.EndDate == null && employeeIds.Contains(r.EmployeeId.Value))
                        .GroupBy(r => r.EmployeeId)
                        .Select(g => new { EmployeeId = g.Key, RoleName = g.OrderByDescending(r => r.Role.RoleLevel).Select(r => r.Role.RoleName).FirstOrDefault() })
                        .ToListAsync();

            //Truy vấn thông tin nhân viên
            var employeeData = await _context.Employees
                .Where(e => e.Status == true &&
                            e.Contracts.Any(c => c.StartDate <= monthEnd &&
                                                 (c.EndDate == null || c.EndDate >= monthStart)))
                .Include(e => e.HoursWorkDays)
                .Include(e => e.RolesEmployees)
                .ThenInclude(re => re.Role)
            .Select(e => new
            {
                EmployeeId = e.EmployeeId,
                FullName = e.LastName + " " + e.FirstName,
                Gender = e.Gender ?? false,
                Role = e.RolesEmployees
                        .Where(re => re.EndDate == null)
                        .OrderByDescending(re => re.Role != null ? re.Role.RoleLevel : 0)
                        .Select(re => re.Role != null ? re.Role.RoleName : null)
                        .FirstOrDefault(),
                WorkDays = e.HoursWorkDays
                        .Where(h => h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year),
                TotalHours = e.HoursWorkDays
                        .Where(h => h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                        .Sum(h => h.Hour.GetValueOrDefault())
            })
            .ToListAsync();

            //Truy vấn tổng lương làm theo giờ
            var actualSalaries = await _context.HoursWorkDays
                                .Where(h => h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                .GroupBy(h => h.EmployeeId)
                                .Select(g => new { EmployeeId = g.Key, BasicSalary = g.Sum(h => h.DailyRate.GetValueOrDefault()) })
                                .ToListAsync();

            //Truy vấn lương cơ bản trong hợp đồng
            var basicSalaries = await _context.Contracts
                                .Where(c => c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                                .ToDictionaryAsync(c => c.EmployeeId, c => c.Amount.GetValueOrDefault());

            //Truy vấn các khoản phụ cấp
            var allowanceData = await _context.EmployeesAllowances
                                .Include(ea => ea.AllowanceType)
                                .ThenInclude(at => at.Allowance)
                                .Where(ea => ea.EmployeeId != null)
                                .GroupBy(ea => ea.EmployeeId)
                                .Select(g => new
                                {
                                    EmployeeId = g.Key,
                                    Allowances = g.Select(ea => new
                                    {
                                        AllowanceTypeId = ea.AllowanceTypeId,
                                        AllowanceName = ea.AllowanceType.Allowance.Name,
                                        Amount = ea.AllowanceType.Amount.GetValueOrDefault(),
                                        Status = ea.AllowanceType.Allowance.Status
                                    }).ToList()
                                }).ToListAsync();

            //Truy vấn các khoản trừ
            var deductionData = await _context.DeductionsDetails
                                .Include(dd => dd.DeductionType)
                                .Select(dd => new
                                {
                                    DeductionTypeName = dd.DeductionType.Name,
                                    Percentage = dd.Percentage ?? 0
                                })
                                .Distinct()
                                .ToListAsync();


            // Truy vấn tổng phần trăm của tất cả các khoản trừ
            double totalDeductionPercentageDouble = await _context.DeductionsDetails
                .SumAsync(dd => dd.Percentage ?? 0);

            // Chuyển đổi sang decimal
            decimal totalDeductionPercentage = (decimal)totalDeductionPercentageDouble;

            // Truy vấn tổng phần trăm của các khoản trừ có Status là false
            double falseDeductionPercentageDouble = await _context.DeductionsDetails
                .Include(dd => dd.DeductionType)
                .Where(dd => dd.DeductionType.Status == false)
                .SumAsync(dd => dd.Percentage ?? 0);

            // Chuyển đổi sang decimal
            decimal falseDeductionPercentage = (decimal)falseDeductionPercentageDouble;



            int maxAllowances = allowanceData.Any() ? allowanceData.Max(a => a.Allowances.Count) : 0;
            int maxIdLength = employeeData.Any() ? employeeData.Max(e => e.EmployeeId.ToString().Length) : 0;

            var uniqueAllowanceTypes = allowanceData
                .SelectMany(a => a.Allowances)
                .Select(a => a.AllowanceName)
                .Distinct()
                .OrderBy(name => name)
                .ToList();

            using var package = new ExcelPackage();
            var worksheet = package.Workbook.Worksheets.Add("Salaries");
            worksheet.Cells["A1:A2"].Merge = true;
            worksheet.Cells["B1:B2"].Merge = true;
            worksheet.Cells["C1:C2"].Merge = true;
            worksheet.Cells["D1:D2"].Merge = true;
            worksheet.Cells["E1:E2"].Merge = true;
            worksheet.Cells["F1:F2"].Merge = true;
            worksheet.Cells["G1:G2"].Merge = true;
            worksheet.Cells["H1:H2"].Merge = true;
            worksheet.Cells["I1:I2"].Merge = true;
            worksheet.Cells["J1:J2"].Merge = true;

            worksheet.Cells["A1"].Value = "STT";
            worksheet.Cells["B1"].Value = "Tháng/Năm";
            worksheet.Cells["C1"].Value = "MNV";
            worksheet.Cells["D1"].Value = "Họ tên NV";
            worksheet.Cells["E1"].Value = "Chức vụ";
            worksheet.Cells["F1"].Value = "Giới tính";
            worksheet.Cells["G1"].Value = "Số công";
            worksheet.Cells["H1"].Value = "Số giờ làm";
            worksheet.Cells["I1"].Value = "Lương cơ bản";
            worksheet.Cells["J1"].Value = "Lương thực tế";

            // bắt đầu từ cột kí tự K trong bảng Excel
            int allowanceHeaderStart = 11;
            int allowanceHeaderEnd = 10 + uniqueAllowanceTypes.Count;
            worksheet.Cells[1, allowanceHeaderStart, 1, allowanceHeaderEnd].Merge = true;
            worksheet.Cells[1, allowanceHeaderStart].Value = "Phụ cấp";

            // Thiết lập tiêu đề cho phần các khoản trừ
            int deductionHeaderStart = allowanceHeaderEnd + 1;
            int deductionHeaderEnd = deductionHeaderStart + deductionData.Count - 1;
            worksheet.Cells[1, deductionHeaderStart, 1, deductionHeaderEnd].Merge = true;
            worksheet.Cells[1, deductionHeaderStart].Value = "Các Khoản Trừ";




            if (deductionHeaderEnd < deductionHeaderStart)
            {
                deductionHeaderEnd = deductionHeaderStart;
            }

            int reductionHeaderStart = deductionHeaderEnd + 1;
            int reductionHeaderEnd = reductionHeaderStart + 2;


            worksheet.Cells[2, deductionHeaderStart].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[2, deductionHeaderStart].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

            worksheet.Cells[1, reductionHeaderStart, 1, reductionHeaderEnd].Merge = true;
            worksheet.Cells[1, reductionHeaderStart].Value = "Các Khoản Giảm Trừ";
            worksheet.Cells[1, reductionHeaderStart].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, reductionHeaderStart].Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            worksheet.Cells[2, reductionHeaderStart].Value = "Bảo Hiểm";
            worksheet.Cells[2, reductionHeaderStart + 1].Value = "Giảm Trừ Gia Cảnh";
            worksheet.Cells[2, reductionHeaderStart + 2].Value = "Người Phụ Thuộc";

            int deductionColumnIndex = deductionHeaderStart;
            foreach (var deduction in deductionData)
            {
                worksheet.Cells[2, deductionColumnIndex].Value = $"{deduction.DeductionTypeName} ({deduction.Percentage * 100}%)";
                deductionColumnIndex++;
            }

            //Thêm tiêu đề cột cho các phụ cấp vào Excel
            int allowanceColumnIndex = allowanceHeaderStart;
            foreach (var allowanceName in uniqueAllowanceTypes)
            {
                worksheet.Cells[2, allowanceColumnIndex].Value = allowanceName;
                allowanceColumnIndex++;
            }

            //Tính % bảo hiểm
            decimal insuranceDeductionPercentage = totalDeductionPercentage - falseDeductionPercentage;

            // Tính tổng all Bảo hiểm
            int taxableIncomeHeaderIndex = reductionHeaderEnd + 1;
            worksheet.Cells[1, taxableIncomeHeaderIndex, 2, taxableIncomeHeaderIndex].Merge = true;
            worksheet.Cells[1, taxableIncomeHeaderIndex].Value = "Thu nhập chịu thuế";
            worksheet.Cells[1, taxableIncomeHeaderIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, taxableIncomeHeaderIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;


            //Header thu nhập tính thuế
            int taxableIncomeColumnIndex = taxableIncomeHeaderIndex + 1;
            worksheet.Cells[1, taxableIncomeColumnIndex, 2, taxableIncomeColumnIndex].Merge = true;
            worksheet.Cells[1, taxableIncomeColumnIndex].Value = "Thu nhập Tính Thuế";
            worksheet.Cells[1, taxableIncomeColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, taxableIncomeColumnIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

            //Header TNCN
            int personalIncomeTaxColumnIndex = taxableIncomeColumnIndex + 1;
            worksheet.Cells[1, personalIncomeTaxColumnIndex, 2, personalIncomeTaxColumnIndex].Merge = true;
            worksheet.Cells[1, personalIncomeTaxColumnIndex].Value = "Thuế TNCN";
            worksheet.Cells[1, personalIncomeTaxColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, personalIncomeTaxColumnIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

            //Header thực nhật
            int ActualSalaryColumnIndex = personalIncomeTaxColumnIndex + 1;
            worksheet.Cells[1, ActualSalaryColumnIndex, 2, ActualSalaryColumnIndex].Merge = true;
            worksheet.Cells[1, ActualSalaryColumnIndex].Value = "Thực nhận";
            worksheet.Cells[1, ActualSalaryColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, ActualSalaryColumnIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;


            // Đặt font in đậm và căn giữa cho tất cả các header
            worksheet.Row(1).Style.Font.Bold = true;
            worksheet.Row(2).Style.Font.Bold = true;
            worksheet.Cells[1, 1, 2, ActualSalaryColumnIndex].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, 1, 2, ActualSalaryColumnIndex].Style.VerticalAlignment = ExcelVerticalAlignment.Center;

            // Điều chỉnh kích thước cột
            for (int i = 1; i <= ActualSalaryColumnIndex; i++)
            {
                worksheet.Column(i).AutoFit(); // Hoặc sử dụng worksheet.Column(i).Width = giá trị cụ thể cho cột cần rộng hơn
            }

            // Đặt màu cho header
            using (var headerRange = worksheet.Cells[1, 1, 2, ActualSalaryColumnIndex])
            {
                headerRange.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                headerRange.Style.Fill.BackgroundColor.SetColor(System.Drawing.Color.LightBlue);
                headerRange.Style.Font.Bold = true;
                headerRange.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                headerRange.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
            }

            // Thêm viền cho toàn bộ bảng
            int totalRows = employeeData.Count + 2; // 2 hàng header
            using (var dataRange = worksheet.Cells[1, 1, totalRows, ActualSalaryColumnIndex])
            {
                dataRange.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                dataRange.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                dataRange.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                dataRange.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            }

            //Hiển thị dữ liệu
            int row = 3;
            decimal totalTaxableIncome = 0m;

            foreach (var data in employeeData)
            {
                var actualSalary = actualSalaries.FirstOrDefault(s => s.EmployeeId == data.EmployeeId)?.BasicSalary ?? 0;
                var basicSalary = basicSalaries.GetValueOrDefault(data.EmployeeId, 0);
                var allowances = allowanceData.FirstOrDefault(a => a.EmployeeId == data.EmployeeId)?.Allowances;
                var contractAmount = basicSalaries.GetValueOrDefault(data.EmployeeId, 0);


                const decimal familyAllowance = 11000000;

                // Tính Người phụ thuộc
                int numberOfDependents = _context.Dependents.Count(d => d.EmployeeId == data.EmployeeId && (d.EndDate == null || d.EndDate >= DateTime.Today));
                decimal dependentAllowance = numberOfDependents * 4400000;

                // Tính Bảo hiểm
                decimal insuranceAmount = basicSalaries.GetValueOrDefault(data.EmployeeId, 0) * totalDeductionPercentage;

                //Tính thực nhận
                decimal insuranceAmountBasic = basicSalaries.GetValueOrDefault(data.EmployeeId, 0) * totalDeductionPercentage;

                int insuranceColumnIndex = deductionHeaderEnd + 1;
                int familyAllowanceColumnIndex = insuranceColumnIndex + 1;
                int dependentColumnIndex = familyAllowanceColumnIndex + 1;
                int insuranceHeaderIndex = deductionHeaderEnd + 1;
                int familyAllowanceHeaderIndex = insuranceHeaderIndex + 1;
                int dependentHeaderIndex = familyAllowanceHeaderIndex + 1;

                // Tính tổng các khoản phụ cấp có status là true
                decimal totalAllowance = 0m;
                if (allowances != null)
                {
                    foreach (var allowance in allowances)
                    {
                        if (allowance != null && allowance.Status == true)
                        {
                            totalAllowance += allowance.Amount;
                        }
                    }
                }


                worksheet.Cells[row, 1].Value = row - 2;
                worksheet.Cells[row, 2].Value = $"{month}/{year}";
                worksheet.Cells[row, 3].Value = data.EmployeeId.ToString($"D{maxIdLength}");
                worksheet.Cells[row, 4].Value = data.FullName;
                worksheet.Cells[row, 5].Value = data.Role;
                worksheet.Cells[row, 6].Value = data.Gender == true ? "Nam" : "Nữ";
                worksheet.Cells[row, 7].Value = data.WorkDays.Count() != 0 ? (object)data.WorkDays.Count() : "-";
                worksheet.Cells[row, 8].Value = data.TotalHours != 0 ? (object)data.TotalHours : "-";
                worksheet.Cells[row, 9].Value = basicSalary != 0 ? (object)basicSalary : "-";
                worksheet.Cells[row, 10].Value = actualSalary != 0 ? (object)actualSalary : "-";
                worksheet.Cells[row, insuranceHeaderIndex].Value = insuranceAmount != 0 ? (object)insuranceAmount : "-";

                //Hiển thị các khoản phụ cấp
                allowanceColumnIndex = allowanceHeaderStart;
                foreach (var allowanceType in uniqueAllowanceTypes)
                {
                    var amount = allowances?.FirstOrDefault(a => a.AllowanceName == allowanceType)?.Amount ?? 0;
                    worksheet.Cells[row, allowanceColumnIndex].Value = amount != 0 ? (object)amount : "-";
                    allowanceColumnIndex++;
                }

                //Hiển thị các khoản giảm trừ
                deductionColumnIndex = deductionHeaderStart;
                foreach (var deduction in deductionData)
                {
                    var deductionAmount = contractAmount * (decimal)deduction.Percentage;
                    worksheet.Cells[row, deductionColumnIndex].Value = deductionAmount != 0 ? (object)deductionAmount : "-";
                    deductionColumnIndex++;
                }
                worksheet.Cells[row, insuranceColumnIndex].Value = insuranceAmount != 0 ? (object)insuranceAmount : "-";
                worksheet.Cells[row, familyAllowanceColumnIndex].Value = familyAllowance != 0 ? (object)familyAllowance : "-";
                worksheet.Cells[row, dependentColumnIndex].Value = dependentAllowance != 0 ? (object)dependentAllowance : "-";

                //Tính tổng thu nhập chịu thuế và hiển thị
                decimal taxableIncome = actualSalary + totalAllowance;
                worksheet.Cells[row, taxableIncomeHeaderIndex].Value = taxableIncome != 0 ? (object)taxableIncome : "-";

                //Tính tổng các khoản giảm trừ
                decimal totalReductions = insuranceAmount + familyAllowance + dependentAllowance;


                //Tính tổng thu nhập chịu thuế và hiển thị
                decimal incomeSubjectToTax = taxableIncome - totalReductions;
                int incomeSubjectToTaxColumnIndex = taxableIncomeHeaderIndex + 1;
                worksheet.Cells[row, incomeSubjectToTaxColumnIndex].Value = incomeSubjectToTax > 0 ? (object)incomeSubjectToTax : "-";

                // Tính Thuế TNCN 
                decimal personalIncomeTax = CalculatePersonalIncomeTax(incomeSubjectToTax);
                worksheet.Cells[row, personalIncomeTaxColumnIndex].Value = personalIncomeTax > 0 ? (object)personalIncomeTax : "-";

                //Tính thực nhận
                decimal actualReceivedSalary = actualSalary + totalAllowance - insuranceAmount;
                worksheet.Cells[row, ActualSalaryColumnIndex].Value = actualReceivedSalary > 0 ? (object)actualReceivedSalary : "-";
                row++;
            }

            using (var range = worksheet.Cells[1, 1, 2, allowanceHeaderEnd])
            {
                range.Style.Font.Bold = true;
                range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                range.Style.VerticalAlignment = ExcelVerticalAlignment.Center;
                range.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                range.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                range.Style.Border.Right.Style = ExcelBorderStyle.Thin;
                range.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
            }

            

            var stream = new MemoryStream();
            package.SaveAs(stream);
            stream.Position = 0;

            return stream;
        }



    }
}
