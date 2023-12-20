using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalary;
using CarpentryWorkshopAPI.Models;
using ClosedXML.Excel;
using Microsoft.EntityFrameworkCore;


namespace CarpentryWorkshopAPI.Services.Salary
{
    public class ExcelSalarySevice : IExcelSalarySevice
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;

        public ExcelSalarySevice(SEPG4CWMSContext context, IMapper mapper)
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


                    SetMergedHeader(worksheet, "J4:R4", "Bảng tính tiền lương nhân viên");
                    SetMergedHeader(worksheet, "N5", $"Tháng {month}");
                    SetMergedHeader(worksheet, "AJ1:AK1", "Mẫu số: 02 - LĐTL");
                    SetMergedHeader(worksheet, "AI2:AL2", "(Ban hành theo Thông tư số 200/2014/TT-BTC");
                    SetMergedHeader(worksheet, "AI3:AL3", "Ngày 22/12/2014 của Bộ Tài chính)");


                    // Đặt giá trị và xử lý hợp nhất cho các ô header
                    SetColorMergedHeader(worksheet, "B7:B9", "Mã nv");
                    SetColorMergedHeader(worksheet, "C7:C9", "STT");
                    SetColorMergedHeader(worksheet, "D7:D9", "Họ và tên");
                    SetColorMergedHeader(worksheet, "E7:E9", "Chức vụ");
                    SetColorMergedHeader(worksheet, "F7:F9", "BP");
                    SetColorMergedHeader(worksheet, "G7:G9", "GT");
                    SetColorMergedHeader(worksheet, "H7:H9", "Công thực tế");
                    SetColorMergedHeader(worksheet, "I7:I9", "Công lễ tết");
                    SetColorMergedHeader(worksheet, "J7:J9", "Công làm thêm");
                    SetColorMergedHeader(worksheet, "K7:K9", "Lương cơ bản");
                    SetColorMergedHeader(worksheet, "L7:L9", "");
                    SetColorMergedHeader(worksheet, "M7:M9", "Tổng lương tham gia BHXH");
                    SetColorMergedHeader(worksheet, "N7:N9", "Lương ngày công thực tế");
                    SetColorMergedHeader(worksheet, "O7:O9", "Lương làm thêm");
                    SetColorMergedHeader(worksheet, "P7:R7", "Phụ cấp");
                    SetColorMergedHeader(worksheet, "P8:P9", "Ăn ca");
                    SetColorMergedHeader(worksheet, "Q8:Q9", "Trang phục");
                    SetColorMergedHeader(worksheet, "R8:R9", "Điện thoại, xăng xe");
                    SetColorMergedHeader(worksheet, "S7:S9", "Lương kinh doanh / lương sản lượng");
                    SetColorMergedHeader(worksheet, "T7:T9", "Tổng lương thực tế");
                    SetColorMergedHeader(worksheet, "U7:X7", "Các khoản trừ");
                    SetColorMergedHeader(worksheet, "U8:U9", "BHXH (8%)");
                    SetColorMergedHeader(worksheet, "V8:V9", "BHYT (1,5%)");
                    SetColorMergedHeader(worksheet, "W8:W9", "BHTN (1%)");
                    SetColorMergedHeader(worksheet, "X8:X9", "Phí công đoàn (1%)");
                    SetColorMergedHeader(worksheet, "Y7:Y9", "TN chịu thuế");
                    SetColorMergedHeader(worksheet, "Z7:AB7", "Các khoản giảm trừ");
                    SetColorMergedHeader(worksheet, "Z8:Z9", "Giảm trừ gia cảnh");
                    SetColorMergedHeader(worksheet, "AA8:AA9", "Người phục thuộc");
                    SetColorMergedHeader(worksheet, "AB8:AB9", "Bảo hiểm");
                    SetColorMergedHeader(worksheet, "AC7:AC9", "TN Tính thuế");
                    SetColorMergedHeader(worksheet, "AD7:AD9", "Thuế TNCN");
                    SetColorMergedHeader(worksheet, "AE7:AE9", "Tạm ứng");
                    SetColorMergedHeader(worksheet, "AF7:AH7", "Các khoản khác");
                    SetColorMergedHeader(worksheet, "AF8:AF9", "Thưởng cá nhân");
                    SetColorMergedHeader(worksheet, "AG8:AG9", "Thưởng dịp đặc biệt");
                    SetColorMergedHeader(worksheet, "AH8:AH9", "Thưởng công ty");
                    SetColorMergedHeader(worksheet, "AI7:AI9", "Thực lĩnh");

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
                        worksheet.Cell(startRow, 11).Value = ConvertToFormattedString(employee.BasicSalary.ToString());
                        worksheet.Cell(startRow, 13).Value = ConvertToFormattedString(employee.InsuranceSalary.ToString());
                        worksheet.Cell(startRow, 14).Value = ConvertToFormattedString(employee.ActualDaySalary.ToString());
                        worksheet.Cell(startRow, 15).Value = ConvertToFormattedString(employee.OvertimeSalary.ToString());

                        worksheet.Cell(startRow, 16).Value = ConvertToFormattedString(employee.Allowances.Meal.ToString());
                        worksheet.Cell(startRow, 17).Value = ConvertToFormattedString(employee.Allowances.Uniform.ToString());
                        worksheet.Cell(startRow, 18).Value = ConvertToFormattedString(employee.Allowances.Petrol.ToString());

                        worksheet.Cell(startRow, 19).Value = ConvertToFormattedString(employee.BusinessSalary.ToString());
                        worksheet.Cell(startRow, 20).Value = ConvertToFormattedString(employee.TotalActualSalary.ToString());

                        worksheet.Cell(startRow, 21).Value = ConvertToFormattedString(employee.Deductions.SocialInsurance.ToString());
                        worksheet.Cell(startRow, 22).Value = ConvertToFormattedString(employee.Deductions.HealthInsurance.ToString());
                        worksheet.Cell(startRow, 23).Value = ConvertToFormattedString(employee.Deductions.UnemploymentInsurance.ToString());
                        worksheet.Cell(startRow, 24).Value = ConvertToFormattedString(employee.Deductions.UnionFees.ToString());

                        worksheet.Cell(startRow, 25).Value = ConvertToFormattedString(employee.TaxableIncome.ToString());

                        worksheet.Cell(startRow, 26).Value = ConvertToFormattedString(employee.TaxDeductions.PersonalRelief.ToString());
                        worksheet.Cell(startRow, 27).Value = ConvertToFormattedString(employee.TaxDeductions.DependentRelief.ToString());
                        worksheet.Cell(startRow, 28).Value = ConvertToFormattedString(employee.TaxDeductions.Insurance.ToString());

                        worksheet.Cell(startRow, 29).Value = ConvertToFormattedString(employee.IncomeTax.ToString());
                        worksheet.Cell(startRow, 30).Value = ConvertToFormattedString(employee.PersonalIncomeTax.ToString());
                        worksheet.Cell(startRow, 31).Value = ConvertToFormattedString(employee.Advances.ToString());
                        worksheet.Cell(startRow, 32).Value = ConvertToFormattedString(employee.Bonus.ToString());
                        worksheet.Cell(startRow, 33).Value = ConvertToFormattedString(employee.SpecialOccasion.ToString());
                        worksheet.Cell(startRow, 34).Value = ConvertToFormattedString(employee.CompanyWideBonus.ToString());
                        worksheet.Cell(startRow, 35).Value = ConvertToFormattedString(employee.ActualReceived.ToString());

                        SetStyleBody(worksheet.Cell(startRow, 2));
                        SetStyleBody(worksheet.Cell(startRow, 3));
                        SetStyleBody(worksheet.Cell(startRow, 4));
                        SetStyleBody(worksheet.Cell(startRow, 5));
                        SetStyleBody(worksheet.Cell(startRow, 6));
                        SetStyleBody(worksheet.Cell(startRow, 7));
                        SetStyleBody(worksheet.Cell(startRow, 8));
                        SetStyleBody(worksheet.Cell(startRow, 9));
                        SetStyleBody(worksheet.Cell(startRow, 10));
                        SetStyleBody(worksheet.Cell(startRow, 11));
                        SetStyleBody(worksheet.Cell(startRow, 12));
                        SetStyleBody(worksheet.Cell(startRow, 13));
                        SetStyleBody(worksheet.Cell(startRow, 14));
                        SetStyleBody(worksheet.Cell(startRow, 15));
                        SetStyleBody(worksheet.Cell(startRow, 16));
                        SetStyleBody(worksheet.Cell(startRow, 17));
                        SetStyleBody(worksheet.Cell(startRow, 18));
                        SetStyleBody(worksheet.Cell(startRow, 19));
                        SetStyleBody(worksheet.Cell(startRow, 20));
                        SetStyleBody(worksheet.Cell(startRow, 21));
                        SetStyleBody(worksheet.Cell(startRow, 22));
                        SetStyleBody(worksheet.Cell(startRow, 23));
                        SetStyleBody(worksheet.Cell(startRow, 24));
                        SetStyleBody(worksheet.Cell(startRow, 25));
                        SetStyleBody(worksheet.Cell(startRow, 26));
                        SetStyleBody(worksheet.Cell(startRow, 27));
                        SetStyleBody(worksheet.Cell(startRow, 28));
                        SetStyleBody(worksheet.Cell(startRow, 29));
                        SetStyleBody(worksheet.Cell(startRow, 30));
                        SetStyleBody(worksheet.Cell(startRow, 31));
                        SetStyleBody(worksheet.Cell(startRow, 32));
                        SetStyleBody(worksheet.Cell(startRow, 33));
                        SetStyleBody(worksheet.Cell(startRow, 34));
                        SetStyleBody(worksheet.Cell(startRow, 35));

                        SetNumberFormat(worksheet.Cell(startRow, 2));
                        SetNumberFormat(worksheet.Cell(startRow, 3));
                        SetNumberFormat(worksheet.Cell(startRow, 4));
                        SetNumberFormat(worksheet.Cell(startRow, 5));
                        SetNumberFormat(worksheet.Cell(startRow, 6));
                        SetNumberFormat(worksheet.Cell(startRow, 7));
                        SetNumberFormat(worksheet.Cell(startRow, 8));
                        SetNumberFormat(worksheet.Cell(startRow, 9));
                        SetNumberFormat(worksheet.Cell(startRow, 10));
                        SetNumberFormat(worksheet.Cell(startRow, 11));
                        SetNumberFormat(worksheet.Cell(startRow, 12));
                        SetNumberFormat(worksheet.Cell(startRow, 13));
                        SetNumberFormat(worksheet.Cell(startRow, 14));
                        SetNumberFormat(worksheet.Cell(startRow, 15));
                        SetNumberFormat(worksheet.Cell(startRow, 16));
                        SetNumberFormat(worksheet.Cell(startRow, 17));
                        SetNumberFormat(worksheet.Cell(startRow, 18));
                        SetNumberFormat(worksheet.Cell(startRow, 19));
                        SetNumberFormat(worksheet.Cell(startRow, 20));
                        SetNumberFormat(worksheet.Cell(startRow, 21));
                        SetNumberFormat(worksheet.Cell(startRow, 22));
                        SetNumberFormat(worksheet.Cell(startRow, 23));
                        SetNumberFormat(worksheet.Cell(startRow, 24));
                        SetNumberFormat(worksheet.Cell(startRow, 25));
                        SetNumberFormat(worksheet.Cell(startRow, 26));
                        SetNumberFormat(worksheet.Cell(startRow, 27));
                        SetNumberFormat(worksheet.Cell(startRow, 28));
                        SetNumberFormat(worksheet.Cell(startRow, 29));
                        SetNumberFormat(worksheet.Cell(startRow, 30));
                        SetNumberFormat(worksheet.Cell(startRow, 31));
                        SetNumberFormat(worksheet.Cell(startRow, 32));
                        SetNumberFormat(worksheet.Cell(startRow, 33));
                        SetNumberFormat(worksheet.Cell(startRow, 34));
                        SetNumberFormat(worksheet.Cell(startRow, 35));


                        startRow++;
                    }

                    worksheet.Column(4).Width = 40;

                    // Gọi hàm để đặt font chữ cho toàn bộ Excel
                    SetGlobalFont(worksheet);

                    //CSS
                    worksheet.Cell("J4").Style
                         .Font.SetBold()
                         .Font.SetFontSize(25)
                         .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    worksheet.Cell("N5").Style
                        .Font.SetBold()
                        .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center)
                        .Font.SetFontSize(15);

                    worksheet.Cell("AJ1").Style
                        .Font.SetBold()
                        .Font.SetFontSize(10)
                        .Alignment.SetHorizontal(XLAlignmentHorizontalValues.Center);

                    worksheet.Cell("AI2").Style
                        .Font.SetItalic()
                        .Font.SetFontSize(10);

                    worksheet.Cell("AI3").Style
                        .Font.SetItalic()
                        .Font.SetFontSize(10);


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
        void SetNumberFormat(IXLCell cell)
        {
            // Đặt định dạng số cho ô
            cell.Style.NumberFormat.Format = "#,##0";
        }

        private void SetColorMergedHeader(IXLWorksheet worksheet, string range, string value)
        {
            var mergedRange = worksheet.Range(range);
            mergedRange.Merge();
            mergedRange.Value = value;

            double additionalHeight = 0.3;

            for (int rowNumber = mergedRange.FirstRow().RowNumber(); rowNumber <= mergedRange.LastRow().RowNumber(); rowNumber++)
            {
                worksheet.Row(rowNumber).Height += additionalHeight;
            }

            mergedRange.Style.Alignment.Horizontal = XLAlignmentHorizontalValues.Center;
            mergedRange.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            mergedRange.Style.Font.Bold = true;


            mergedRange.Style.Fill.BackgroundColor = XLColor.FromHtml("#d9e2f3");
            mergedRange.Style.Font.FontColor = XLColor.FromHtml("#002060");

            // Đặt màu viền bằng cách sử dụng AddBorder
            mergedRange.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            mergedRange.Style.Border.OutsideBorderColor = XLColor.FromHtml("#bfbfbf");

            // Đặt màu viền xung quanh
            foreach (var cell in mergedRange.CellsUsed())
            {
                cell.Style.Border.LeftBorder = XLBorderStyleValues.Thin;
                cell.Style.Border.LeftBorderColor = XLColor.FromHtml("#bfbfbf");
                cell.Style.Border.TopBorder = XLBorderStyleValues.Thin;
                cell.Style.Border.TopBorderColor = XLColor.FromHtml("#bfbfbf");
                cell.Style.Border.RightBorder = XLBorderStyleValues.Thin;
                cell.Style.Border.RightBorderColor = XLColor.FromHtml("#bfbfbf");
                cell.Style.Border.BottomBorder = XLBorderStyleValues.Thin;
                cell.Style.Border.BottomBorderColor = XLColor.FromHtml("#bfbfbf");

                // Cho phép chữ xuống dòng tự động
                cell.Style.Alignment.WrapText = true;
            }
        }

        private void SetStyleBody(IXLCell cell)
        {
            double additionalHeight = 0.3;
            double additionalWidth = 5; // Specify the additional width you want

            // Adjust the height of the row containing the cell
            cell.WorksheetRow().Height += additionalHeight;

            cell.Style.Alignment.WrapText = false;

            // Adjust the width of the column containing the cell
            cell.WorksheetColumn().Width += additionalWidth;

            // Set the style for the cell
            cell.Style.Alignment.Vertical = XLAlignmentVerticalValues.Center;
            cell.Style.Border.OutsideBorder = XLBorderStyleValues.Thin;
            cell.Style.Border.OutsideBorderColor = XLColor.FromHtml("#bfbfbf");

        }


        // Hàm để đặt font chữ cho toàn bộ Excel
        private void SetGlobalFont(IXLWorksheet worksheet)
        {
            // Đặt font chữ và kích thước cho toàn bộ Excel
            worksheet.Style.Font.FontName = "Times New Roman";
            worksheet.Style.Font.FontSize = 9;
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
                .Include(e => e.RolesEmployees)
                .ThenInclude(re => re.Role)
                .Include(e => e.RolesEmployees)
                .ThenInclude(re => re.Department)
                .Include(e => e.HoursWorkDays)
                .Where(e => e.Contracts.Any(c => c.StartDate <= endDate && c.EndDate >= startDate) && e.Status == true)
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
            var company = await _context.CompanyWideBonus
               .Where(cw => cw.BonusDate >= startDate && cw.BonusDate <= endDate)
               .SumAsync(cw => cw.BonusAmount);
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
                .Sum(h => h.DailyRate) * 1;
                var totalHolidaySalary = e.HoursWorkDays
                .Where(hwd => hwd.Day.HasValue &&
                              holidays.Contains(TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone).Date) &&
                              TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) >= startDate &&
                              TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) <= endDate)
                .Sum(ths => ths.DailyRate) * 2;
                var bonus = e.BonusDetails
                .Where(bd => bd.BonusDate >= startDate && bd.BonusDate <= endDate)
                .Sum(bd => bd.BonusAmount);
                var special = e.SpecialOccasions
                .Where(so => so.OccasionDate >= startDate && so.OccasionDate <= endDate)
                .Sum(so => so.Amount);             
                var totalBs = bonus + special + company;
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
                var mealAllowanceBasic = e.EmployeesAllowances
                   .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
                   && ea.AllowanceType.Allowance.Name.ToLower().Equals(meal.ToLower()))
                   .Select(ea => ea.AllowanceType.Amount)
                   .FirstOrDefault();
                var mealAllowance = mealAllowanceBasic / workingDaysInMonth * (actualWorkDays + workDaysOnHolidays + workDayBonus);
                string clother = "Quần áo";
                var clotherAllowanceBasic = e.EmployeesAllowances
                   .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
                   && ea.AllowanceType.Allowance.Name.ToLower().Equals(clother.ToLower()))
                   .Select(ea => ea.AllowanceType.Amount)
                   .FirstOrDefault();
                var clotherAllowance = clotherAllowanceBasic / workingDaysInMonth * (actualWorkDays + workDaysOnHolidays + workDayBonus);
                string car = "Xăng xe";
                var carAllowanceBasic = e.EmployeesAllowances
                   .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
                   && ea.AllowanceType.Allowance.Name.ToLower().Equals(car.ToLower()))
                   .Select(ea => ea.AllowanceType.Amount)
                   .FirstOrDefault();
                var carAllowance = carAllowanceBasic / workingDaysInMonth * (actualWorkDays + workDaysOnHolidays + workDayBonus);
                var advances = e.AdvancesSalaries
                         .Where(x => x.EmployeeId == e.EmployeeId && x.Date.Value >= startDate && x.Date.Value <= endDate)
                         .Sum(x => x.Amount);

                var roleEmployee = e.RolesEmployees.FirstOrDefault(); 
                var department = roleEmployee?.Department;

                if (department != null && department.IsOffice != 4)
                {
                    basicSalary = latestContract.Amount ?? 0;
                    dailyWage = basicSalary / workingDaysInMonth;
                    actualWorkdaySalary = actualWorkDays * dailyWage;
                }

                if (department != null && department.IsOffice == 4)
                {
                    basicSalary = latestContract.Amount ?? 0;
                    actualWorkdaySalary = e.HoursWorkDays
                        .Where(h => h.Day >= startDate && h.Day <= endDate && h.EmployeeId == e.EmployeeId && h.Day.Value.DayOfWeek != DayOfWeek.Sunday)
                        .Sum(h => (decimal)(h.DailyRate ?? 0));
                }

                var personalRelief = 11000000.00;
                var totaldependent = e.Dependents.Where(x => x.EmployeeId == e.EmployeeId && e.Status == true).Count();
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
                    BasicSalary = (long)basicSalary,
                    InsuranceSalary = (long)basicSalary,
                    ActualDaySalary = (long)actualWorkdaySalary,
                    OvertimeSalary = (long)(totalHolidaySalary + totalOT),
                    Allowances = new Allowances
                    {
                        Meal = (long)mealAllowance,
                        Uniform = (long)clotherAllowance,
                        Petrol = (long)carAllowance
                    },
                    BusinessSalary = (long)bussinessSalary,
                    TotalActualSalary = (long)totalActualSalary,
                    Deductions = new Deductions
                    {
                        SocialInsurance = (long)((decimal)socialInsurance * basicSalary),
                        HealthInsurance = (long)((decimal)healthInsurance * basicSalary),
                        UnemploymentInsurance = (long)((decimal)unemploymentInsurance * basicSalary),
                        UnionFees = (long)((decimal)unionFees * basicSalary)
                    },
                    TaxableIncome = (long)taxableIncome,
                    TaxDeductions = new TaxDeductions
                    {
                        PersonalRelief = (long)personalRelief,
                        DependentRelief = (long)dependentRelief,
                        Insurance = (long)totalInsurance
                    },
                    IncomeTax = (long)incometax,
                    PersonalIncomeTax = (long)personIncome,
                    Advances = (long)advances,
                    JobIncentives = (long)totalBs,
                    Bonus = (long)bonus,
                    SpecialOccasion = (long)special,
                    CompanyWideBonus = (long)company,
                    ActualReceived = (long)(totalActualSalary - totalInsurance - personIncome - advances - (decimal)unionFees * basicSalary + totalBs)

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
                .Count(hwd => hwd.Day.HasValue && hwd.Day.Value >= startDate && hwd.Day.Value <= endDate &&
                              hwd.Day.Value.Month == startDate.Month && hwd.Day.Value.Year == startDate.Year &&
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
        private string ConvertToFormattedString(string input)
        {
            if (int.TryParse(input, out int intValue))
            {
                // Format the integer value with commas
                return intValue.ToString("N0");
            }
            else
            {
                // Handle invalid input
                return "Invalid Input";
            }
        }
        public async Task<EmployeeInfo> GetEmployeesByContractDateAsyncById(int month, int year, int employeeId)
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
                .Where(e => e.Contracts.Any(c => c.StartDate <= endDate && c.EndDate >= startDate) && e.EmployeeId == employeeId)
                .FirstOrDefaultAsync();
            if(employees == null)
            {
                return new EmployeeInfo();
            }
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
            var company = await _context.CompanyWideBonus
               .Where(cw => cw.BonusDate >= startDate && cw.BonusDate <= endDate)
               .SumAsync(cw => cw.BonusAmount);

            var latestContract = GetLatestContract(employees);
            var actualWorkDays = CalculateActualWorkingDays(employees, startDate, endDate, holidays, timeZone);
            var overtimeWorkDays = CalculateOvertimeWorkingDays(employees, startDate, endDate, holidays, timeZone);
            var workDaysOnHolidays = CalculateWorkingDaysOnHolidays(employees, startDate, endDate, holidays, timeZone);
            var workingDaysInMonth = CalculateWorkingDaysInMonth(month, year, holidays, timeZone);
            var workDayBonus = CalculateWorkDayBonus(employees, startDate, endDate);
            var bussinessSalary = CalculateBusinessSalary(employees, startDate, endDate);
            if (bussinessSalary == null)
            {
                bussinessSalary = 0;
            }
            var totalOT = employees.HoursWorkDays
            .Where(h => h.Day >= startDate && h.Day <= endDate && h.Day.Value.DayOfWeek == DayOfWeek.Sunday)
            .Sum(h => h.DailyRate) * 1;
            var totalHolidaySalary = employees.HoursWorkDays
            .Where(hwd => hwd.Day.HasValue &&
                          holidays.Contains(TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone).Date) &&
                          TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) >= startDate &&
                          TimeZoneInfo.ConvertTime(hwd.Day.Value, timeZone) <= endDate)
            .Sum(ths => ths.DailyRate) * 2;
            var bonus = employees.BonusDetails
            .Where(bd => bd.BonusDate >= startDate && bd.BonusDate <= endDate)
            .Sum(bd => bd.BonusAmount);
            var special = employees.SpecialOccasions
            .Where(so => so.OccasionDate >= startDate && so.OccasionDate <= endDate)
            .Sum(so => so.Amount);
            var totalBs = bonus + special + company;
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
            var mealAllowanceBasic = employees.EmployeesAllowances
               .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
               && ea.AllowanceType.Allowance.Name.ToLower().Equals(meal.ToLower()))
               .Select(ea => ea.AllowanceType.Amount)
               .FirstOrDefault();
            var mealAllowance = mealAllowanceBasic / workingDaysInMonth * (actualWorkDays + workDaysOnHolidays + workDayBonus);
            string clother = "Quần áo";
            var clotherAllowanceBasic = employees.EmployeesAllowances
               .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
               && ea.AllowanceType.Allowance.Name.ToLower().Equals(clother.ToLower()))
               .Select(ea => ea.AllowanceType.Amount)
               .FirstOrDefault();
            var clotherAllowance = clotherAllowanceBasic / workingDaysInMonth * (actualWorkDays + workDaysOnHolidays + workDayBonus);
            string car = "Xăng xe";
            var carAllowanceBasic = employees.EmployeesAllowances
               .Where(ea => ea.AllowanceType != null && ea.AllowanceType.Allowance != null
               && ea.AllowanceType.Allowance.Name.ToLower().Equals(car.ToLower()))
               .Select(ea => ea.AllowanceType.Amount)
               .FirstOrDefault();
            var carAllowance = carAllowanceBasic / workingDaysInMonth * (actualWorkDays + workDaysOnHolidays + workDayBonus);
            var advances = employees.AdvancesSalaries
                     .Where(x => x.EmployeeId == employees.EmployeeId && x.Date.Value >= startDate && x.Date.Value <= endDate)
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
                actualWorkdaySalary = employees.HoursWorkDays
                .Where(h => h.Day >= startDate && h.Day <= endDate && h.EmployeeId == employees.EmployeeId && h.Day.Value.DayOfWeek != DayOfWeek.Sunday)
                .Sum(h => (decimal)(h.DailyRate ?? 0));

            }

            var personalRelief = 11000000.00;
            var totaldependent = employees.Dependents.Where(x => x.EmployeeId == employees.EmployeeId).Count();
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
            var result = new EmployeeInfo
            {
                EmployeeId = employees.EmployeeId.ToString().PadLeft(maxEmployeeId.ToString().Length, '0'),
                OrderNumber = sequence++,
                FullName = employees.LastName + " " + employees.FirstName,
                Position = employees.RolesEmployees.OrderByDescending(re => re.Role.RoleLevel).FirstOrDefault()?.Role.RoleName ?? "No Role",
                Location = latestContract != null && (bool)latestContract.IsOffice ? "VP" : "SX",
                Gender = (bool)employees.Gender ? "Nam" : "Nữ",
                ActualWork = actualWorkDays,
                HolidayWork = workDaysOnHolidays,
                Overtime = workDayBonus,
                BasicSalary = (long)basicSalary,
                InsuranceSalary = (long)basicSalary,
                ActualDaySalary = (long)actualWorkdaySalary,
                OvertimeSalary = (long)(totalHolidaySalary + totalOT),
                Allowances = new Allowances
                {
                    Meal = (long)mealAllowance,
                    Uniform = (long)clotherAllowance,
                    Petrol = (long)carAllowance
                },
                BusinessSalary = (long)bussinessSalary,
                TotalActualSalary = (long)totalActualSalary,
                Deductions = new Deductions
                {
                    SocialInsurance = (long)((decimal)socialInsurance * basicSalary),
                    HealthInsurance = (long)((decimal)healthInsurance * basicSalary),
                    UnemploymentInsurance = (long)((decimal)unemploymentInsurance * basicSalary),
                    UnionFees = (long)((decimal)unionFees * basicSalary)
                },
                TaxableIncome = (long)taxableIncome,
                TaxDeductions = new TaxDeductions
                {
                    PersonalRelief = (long)personalRelief,
                    DependentRelief = (long)dependentRelief,
                    Insurance = (long)totalInsurance
                },
                IncomeTax = (long)incometax,
                PersonalIncomeTax = (long)personIncome,
                Advances = (long)advances,
                JobIncentives = (long)totalBs,
                Bonus = (long)bonus,
                SpecialOccasion = (long)special,
                CompanyWideBonus = (long)company,
                ActualReceived = (long)(totalActualSalary - totalInsurance - personIncome - advances - (decimal)unionFees * basicSalary + totalBs)

            };
            return result;
        }

    }
}
