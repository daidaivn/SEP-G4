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
                using (var httpClient = new HttpClient())
                {
                    var templateUrl = "https://docs.google.com/spreadsheets/d/1UpVg-UHm7Km6L91BEn9uPiHLQPFUxCN0/edit?usp=drive_link&ouid=106719340337883972795&rtpof=true&sd=true";
                    var templateStream = await httpClient.GetStreamAsync(templateUrl);
                    using (var templateWorkbook = new XLWorkbook("Sample.xlsx"))
                    {
                        var templateWorksheet = templateWorkbook.Worksheet(1);

                        // Tạo workbook mới
                        var newWorkbook = new XLWorkbook();
                        var newWorksheet = newWorkbook.Worksheets.Add("Sheet1");

                        // Sao chép định dạng cơ bản của từng cột
                        foreach (var column in templateWorksheet.ColumnsUsed())
                        {
                            newWorksheet.Column(column.ColumnNumber()).Width = column.Width;
                        }

                        // Sao chép định dạng và cấu trúc hợp nhất ô của hàng từ 1 đến 9
                        for (int i = 1; i <= 9; i++)
                        {
                            var templateRow = templateWorksheet.Row(i);
                            var newRow = newWorksheet.Row(i);

                            newRow.Height = templateRow.Height;
                            newRow.Style = templateRow.Style;

                            foreach (var cell in templateRow.CellsUsed())
                            {
                                var newCell = newRow.Cell(cell.Address.ColumnNumber);
                                newCell.Style = cell.Style;
                                newCell.Value = cell.Value;
                            }
                        }

                        // Sao chép các ô hợp nhất từ hàng 1 đến 9
                        foreach (var mergedRange in templateWorksheet.MergedRanges)
                        {
                            if (mergedRange.FirstRow().RowNumber() <= 9 && mergedRange.LastRow().RowNumber() <= 9)
                            {
                                newWorksheet.Range(mergedRange.RangeAddress.ToString()).Merge();
                            }
                        }

                        // Sao chép định dạng của từng ô từ file mẫu
                        foreach (var cell in templateWorksheet.CellsUsed())
                        {
                            var newCell = newWorksheet.Cell(cell.Address.RowNumber, cell.Address.ColumnNumber);
                            newCell.Style = cell.Style;
                            newCell.Value = cell.Value;
                        }

                        foreach (var mergedRange in templateWorksheet.MergedRanges)
                        {
                            if (mergedRange.FirstRow().RowNumber() >= 10)
                            {
                                var sourceRange = templateWorksheet.Range(mergedRange.RangeAddress.ToString());
                                var destinationRange = newWorksheet.Range(mergedRange.RangeAddress.ToString());

                                // Sao chép định dạng từ ô nguồn sang ô đích
                                sourceRange.CopyTo(destinationRange);
                            }
                        }

                        // Thêm dữ liệu nhân viên từ hàng 10 trở đi
                        int startRow = 10;
                        foreach (var employee in employeesData)
                        {
                            newWorksheet.Cell(startRow, "B").Value = employee.EmployeeId;
                            newWorksheet.Cell(startRow, "C").Value = employee.OrderNumber;
                            newWorksheet.Cell(startRow, "D").Value = employee.FullName;
                            newWorksheet.Cell(startRow, "E").Value = employee.Position;
                            newWorksheet.Cell(startRow, "F").Value = employee.Location;
                            newWorksheet.Cell(startRow, "G").Value = employee.Gender;
                            newWorksheet.Cell(startRow, "H").Value = employee.ActualWork;
                            newWorksheet.Cell(startRow, "I").Value = employee.HolidayWork;
                            newWorksheet.Cell(startRow, "J").Value = employee.Overtime;
                            newWorksheet.Cell(startRow, "K").Value = employee.BasicSalary.ToString();
                            newWorksheet.Cell(startRow, "M").Value = employee.InsuranceSalary.ToString();
                            newWorksheet.Cell(startRow, "N").Value = employee.ActualDaySalary.ToString();
                            newWorksheet.Cell(startRow, "O").Value = employee.OvertimeSalary.ToString();

                            newWorksheet.Cell(startRow, "P").Value = employee.Allowances.Meal.ToString();
                            newWorksheet.Cell(startRow, "Q").Value = employee.Allowances.Uniform.ToString();
                            newWorksheet.Cell(startRow, "R").Value = employee.Allowances.Petrol.ToString();

                            newWorksheet.Cell(startRow, "S").Value = employee.BusinessSalary.ToString();
                            newWorksheet.Cell(startRow, "T").Value = employee.TotalActualSalary.ToString();

                            newWorksheet.Cell(startRow, "U").Value = employee.Deductions.SocialInsurance.ToString();
                            newWorksheet.Cell(startRow, "V").Value = employee.Deductions.HealthInsurance.ToString();
                            newWorksheet.Cell(startRow, "W").Value = employee.Deductions.UnemploymentInsurance.ToString();
                            newWorksheet.Cell(startRow, "X").Value = employee.Deductions.UnionFees.ToString();

                            newWorksheet.Cell(startRow, "Y").Value = employee.TaxableIncome.ToString();

                            newWorksheet.Cell(startRow, "Z").Value = employee.TaxDeductions.PersonalRelief.ToString();
                            newWorksheet.Cell(startRow, "AA").Value = employee.TaxDeductions.DependentRelief.ToString();
                            newWorksheet.Cell(startRow, "AB").Value = employee.TaxDeductions.Insurance.ToString();

                            newWorksheet.Cell(startRow, "AC").Value = employee.IncomeTax.ToString();
                            newWorksheet.Cell(startRow, "AD").Value = employee.PersonalIncomeTax.ToString();
                            newWorksheet.Cell(startRow, "AE").Value = employee.Advances.ToString();
                            newWorksheet.Cell(startRow, "AF").Value = employee.JobIncentives.ToString();
                            newWorksheet.Cell(startRow, "AG").Value = employee.ActualReceived.ToString();

                            startRow++;
                        }

                        // Sao chép định dạng của từng ô từ file mẫu
                        foreach (var cell in templateWorksheet.CellsUsed())
                        {
                            var newCell = newWorksheet.Cell(cell.Address.RowNumber, cell.Address.ColumnNumber);
                            newCell.Style = cell.Style;
                            newCell.Value = cell.Value;
                        }

                        // Định dạng hàng từ 1 đến 6 và từ 10 trở xuống
                        var borderStyle = XLBorderStyleValues.Thin;
                        var borderColor = XLColor.White;
                        var fontColor = XLColor.Black; // Màu chữ
                        var fontBold = false; // Chữ in đậm
                        var backgorundBoderColor = XLColor.Gray;

                        for (int i = 1; i <= 6; i++)
                        {
                            var rowStyle = newWorksheet.Row(i).Style;
                            rowStyle
                                .Border.SetOutsideBorder(borderStyle)
                                .Border.SetInsideBorder(borderStyle)
                                .Border.SetOutsideBorderColor(borderColor)
                                .Border.SetInsideBorderColor(borderColor)
                                .Fill.SetBackgroundColor(XLColor.White);

                            // Định dạng chữ
                            rowStyle.Font.FontColor = fontColor;
                            rowStyle.Font.Bold = fontBold;
                            // Định dạng căn chữ
                            rowStyle.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
                        }

                        // Lưu workbook mới vào memory stream
                        newWorkbook.SaveAs(memoryStream);
                        memoryStream.Position = 0;
                    }
                    return memoryStream;
                }
            }
            catch (Exception ex)
            {
                throw;
            }
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
            var results =  await Task.WhenAll(resultTask);

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
