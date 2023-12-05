using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.IServices.ISalary;
using AutoMapper;
using ClosedXML.Excel;
using CarpentryWorkshopAPI.DTO;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml.Drawing;


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
        public async Task<MemoryStream> GenerateExcelAsync(int month, int year)
        {
            var employeesData = await GetEmployeesByContractDateAsync(month, year);
            var memoryStream = new MemoryStream();

            try
            {
                using (var workbook = new XLWorkbook())
                {
                    var worksheet = workbook.Worksheets.Add("Sheet1");

                    // Đặt giá trị và xử lý hợp nhất cho các ô header
                    SetMergedHeader(worksheet, "B7:B9", "Mã nv");
                    SetMergedHeader(worksheet, "C7:C9", "STT");
                    SetMergedHeader(worksheet, "D7:D9", "Họ và tên");
                    SetMergedHeader(worksheet, "E7:E9", "Chức vụ");
                    SetMergedHeader(worksheet, "F7:F9", "BP");
                    SetMergedHeader(worksheet, "G7:G9", "GT");
                    SetMergedHeader(worksheet, "H7:H9", "Công thực tế");
                    SetMergedHeader(worksheet, "I7:I9", "Công lễ tết");
                    SetMergedHeader(worksheet, "J7:J9", "Công làm thêm");
                    SetMergedHeader(worksheet, "K7:K9", "Lương cơ bản");
                    SetMergedHeader(worksheet, "L7:L9", "");
                    SetMergedHeader(worksheet, "M7:M9", "Tổng lương tham gia BHXH");
                    SetMergedHeader(worksheet, "N7:N9", "Lương ngày công thực tế");
                    SetMergedHeader(worksheet, "O7:O9", "Lương làm thêm");
                    SetMergedHeader(worksheet, "P7:P9", "Phụ cấp");
                    SetMergedHeader(worksheet, "Q7:Q9", "Ăn ca");
                    SetMergedHeader(worksheet, "R7:R9", "Trang phục");
                    SetMergedHeader(worksheet, "S7:S9", "Điện thoại, xăng xe");
                    SetMergedHeader(worksheet, "T7:T9", "Lương kinh doanh/lương sản lượng");
                    SetMergedHeader(worksheet, "U7:X7", "Các khoản trừ");
                    SetMergedHeader(worksheet, "U8:U9", "BHXH(8%)");
                    SetMergedHeader(worksheet, "V8:V9", "BHYT(1,5%)");
                    SetMergedHeader(worksheet, "W8:W9", "BHTN(1%)");
                    SetMergedHeader(worksheet, "X8:X9", "Phí công đoàn (1%)");
                    SetMergedHeader(worksheet, "Y7:Y9", "TN chịu thuế");
                    SetMergedHeader(worksheet, "Z7:AB7", "Các khoản giảm trừ");
                    SetMergedHeader(worksheet, "Z8:Z9", "Giảm trừ gia cảnh");
                    SetMergedHeader(worksheet, "AA8:AA9", "Người phục thuộc");
                    SetMergedHeader(worksheet, "AB8:AB9", "Bảo hiểm");
                    SetMergedHeader(worksheet, "AC7:AC9", "TN Tính thuế");
                    SetMergedHeader(worksheet, "AD7:AD9", "Thuế TNCN");
                    SetMergedHeader(worksheet, "AE7:AE9", "Tạm ứng");
                    SetMergedHeader(worksheet, "AF7:AF9", "Các khoản khác");
                    SetMergedHeader(worksheet, "AG7:AG9", "Thực lĩnh");

                    // Thêm dữ liệu nhân viên từ hàng 10 trở đi
                    int startRow = 10;
                    foreach (var employee in employeesData)
                    {
                        // Gán dữ liệu nhân viên vào từng ô tương ứng
                        worksheet.Cell(startRow, 2).Value = employee.EmployeeId;
                        worksheet.Cell(startRow, 3).Value = employee.OrderNumber;
                        worksheet.Cell(startRow, 4).Value = employee.FullName;
                        worksheet.Cell(startRow, 5).Value = employee.Position;
                        worksheet.Cell(startRow, 6).Value = employee.Location;
                        worksheet.Cell(startRow, 7).Value = employee.Gender;
                        worksheet.Cell(startRow, 8).Value = employee.ActualWork;
                        worksheet.Cell(startRow, 9).Value = employee.HolidayWork;
                        worksheet.Cell(startRow, 10).Value = employee.Overtime;
                        worksheet.Cell(startRow, 11).Value = employee.BasicSalary.ToString();
                        worksheet.Cell(startRow, 13).Value = employee.InsuranceSalary.ToString();
                        worksheet.Cell(startRow, 14).Value = employee.ActualDaySalary.ToString();
                        worksheet.Cell(startRow, 15).Value = employee.OvertimeSalary.ToString();

                        worksheet.Cell(startRow, 16).Value = employee.Allowances.Meal.ToString();
                        worksheet.Cell(startRow, 17).Value = employee.Allowances.Uniform.ToString();
                        worksheet.Cell(startRow, 18).Value = employee.Allowances.Petrol.ToString();

                        worksheet.Cell(startRow, 19).Value = employee.BusinessSalary.ToString();
                        worksheet.Cell(startRow, 20).Value = employee.TotalActualSalary.ToString();

                        worksheet.Cell(startRow, 21).Value = employee.Deductions.SocialInsurance.ToString();
                        worksheet.Cell(startRow, 22).Value = employee.Deductions.HealthInsurance.ToString();
                        worksheet.Cell(startRow, 23).Value = employee.Deductions.UnemploymentInsurance.ToString();
                        worksheet.Cell(startRow, 24).Value = employee.Deductions.UnionFees.ToString();

                        worksheet.Cell(startRow, 25).Value = employee.TaxableIncome.ToString();

                        worksheet.Cell(startRow, 26).Value = employee.TaxDeductions.PersonalRelief.ToString();
                        worksheet.Cell(startRow, 27).Value = employee.TaxDeductions.DependentRelief.ToString();
                        worksheet.Cell(startRow, 28).Value = employee.TaxDeductions.Insurance.ToString();

                        worksheet.Cell(startRow, 29).Value = employee.IncomeTax.ToString();
                        worksheet.Cell(startRow, 30).Value = employee.PersonalIncomeTax.ToString();
                        worksheet.Cell(startRow, 31).Value = employee.Advances.ToString();
                        worksheet.Cell(startRow, 32).Value = employee.JobIncentives.ToString();
                        worksheet.Cell(startRow, 33).Value = employee.ActualReceived.ToString();

                        // ... (Gán dữ liệu vào các ô khác)

                        startRow++;
                    }

                    // Lưu workbook mới vào memory stream
                    workbook.SaveAs(memoryStream);
                    memoryStream.Position = 0;
                }

                return memoryStream;
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        private void SetMergedHeader(IXLWorksheet worksheet, string range, string value)
        {
            var mergedRange = worksheet.Range(range);
            mergedRange.Merge();
            mergedRange.Value = value;
            mergedRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            mergedRange.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            mergedRange.Style.Font.Bold = true;
            mergedRange.Style.Border.BottomBorder = XLBorderStyleValues.Thin;
        }







        public async Task<IEnumerable<EmployeeInfo>> GetEmployeesByContractDateAsync(int month, int year)
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
                        .Include(e => e.BonusDetails)
                        .Include(e => e.SpecialOccasions)
                .Include(e => e.RolesEmployees).ThenInclude(re => re.Role)
                .Include(e => e.HoursWorkDays)
                .Where(e => e.Contracts.Any(c => c.StartDate <= endDate && c.EndDate >= startDate))
                .ToListAsync();

            int sequence = 1;
            var maxEmployeeId = _context.Employees.Max(e => e.EmployeeId);
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
            string union = "Phí công đoàn";
            var unionFees = await _context.DeductionsDetails
                                 .Include(x => x.DeductionType)
                                 .Where(x => x.DeductionType.Name.ToLower().Equals(union.ToLower()))
                                 .Select(x => x.Percentage)
                                 .FirstOrDefaultAsync();
            var resultTask = employees.Select(async e =>
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
                var bonus = e.BonusDetails
                .Where(bd => bd.BonusDate >= startDate && bd.BonusDate <= endDate)
                .Sum(bd => bd.BonusAmount);
                var special = e.SpecialOccasions
                .Where(so => so.OccasionDate >= startDate && so.OccasionDate <= endDate)
                .Sum(so => so.Amount);
                var totalBs = bonus + special;
                if (totalBs == null)
                {
                    totalBs = 0;
                }
                if (totalHolidaySalary == null)
                {
                    totalHolidaySalary = 0;
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

                var advances = e.AdvancesSalaries
                         .Where(x => x.EmployeeId == e.EmployeeId && x.Date.Value >= startDate && x.Date.Value <= endDate)
                         .Sum(x => x.Amount);
                if (latestContract != null && (bool)latestContract.IsOffice == true)
                {
                    basicSalary = latestContract.Amount ?? 0;
                    dailyWage = basicSalary / workingDaysInMonth;
                    actualWorkdaySalary = actualWorkDays * dailyWage;
                }
                if (latestContract != null && (bool)latestContract.IsOffice == false)
                {
                    basicSalary = latestContract.Amount ?? 0;
                    actualWorkdaySalary = e.HoursWorkDays
                    .Where(h => h.Day >= startDate && h.Day <= endDate && h.EmployeeId == e.EmployeeId)
                    .Sum(h => (decimal)(h.DailyRate ?? 0));

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
                return new EmployeeInfo
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
                    OvertimeSalary = (decimal)(totalHolidaySalary + totalOT),
                    Allowances = new Allowances
                    {
                        Meal = (decimal)mealAllowance,
                        Uniform = (decimal)clotherAllowance,
                        Petrol = (decimal)carAllowance
                    },
                    BusinessSalary = (decimal)bussinessSalary,
                    TotalActualSalary = (decimal)totalActualSalary,
                    Deductions = new Deductions
                    {
                        SocialInsurance = (decimal)socialInsurance * basicSalary,
                        HealthInsurance = (decimal)healthInsurance * basicSalary,
                        UnemploymentInsurance = (decimal)unemploymentInsurance * basicSalary,
                        UnionFees = (decimal)unionFees * basicSalary
                    },
                    TaxableIncome = (decimal)taxableIncome,
                    TaxDeductions = new TaxDeductions
                    {
                        PersonalRelief = (decimal)personalRelief,
                        DependentRelief = (decimal)dependentRelief,
                        Insurance = totalInsurance
                    },
                    IncomeTax = (decimal)incometax,
                    PersonalIncomeTax = personIncome,
                    Advances = (decimal)advances,
                    JobIncentives = (decimal)totalBs,
                    ActualReceived = (decimal)(totalActualSalary - totalInsurance - personIncome - advances - (decimal)unionFees * basicSalary + totalBs)

                };
            });
            var results = await Task.WhenAll(resultTask);

            return results.Where(result => result != null);
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



    }
}
