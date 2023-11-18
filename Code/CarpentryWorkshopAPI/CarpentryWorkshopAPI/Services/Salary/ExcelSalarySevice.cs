﻿using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.IServices.ISalary;
using AutoMapper;
using OfficeOpenXml;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using OfficeOpenXml.Style;

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

        public async Task<MemoryStream> GenerateSalaryExcel(int month, int year)
        {
            var employeeIds = await _context.Employees.Where(em => em.Status == true).Select(e => e.EmployeeId).ToListAsync();
            var roles = await _context.RolesEmployees
                        .Where(r => r.EndDate == null && employeeIds.Contains(r.EmployeeId.Value))
                        .GroupBy(r => r.EmployeeId)
                        .Select(g => new { EmployeeId = g.Key, RoleName = g.OrderByDescending(r => r.Role.RoleLevel).Select(r => r.Role.RoleName).FirstOrDefault() })
                        .ToListAsync();

            var employeeData = await _context.Employees
                .Where(e=>e.Status == true)
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
            var basicSalaries = await _context.HoursWorkDays
                                .Where(h => h.Day.HasValue && h.Day.Value.Month == month && h.Day.Value.Year == year)
                                .GroupBy(h => h.EmployeeId)
                                .Select(g => new { EmployeeId = g.Key, BasicSalary = g.Sum(h => h.DailyRate.GetValueOrDefault()) })
                                .ToListAsync();

            var actualSalaries = await _context.Contracts
                                .Where(c => c.StartDate.HasValue && c.StartDate.Value.Month <= month && c.StartDate.Value.Year <= year && (c.EndDate == null || (c.EndDate.HasValue && c.EndDate.Value.Month >= month && c.EndDate.Value.Year >= year)))
                                .ToDictionaryAsync(c => c.EmployeeId, c => c.Amount.GetValueOrDefault());

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
                                        AllowanceName = ea.AllowanceType.Allowance.Name,
                                        Amount = ea.AllowanceType.Amount.GetValueOrDefault()
                                    }).ToList()
                                }).ToListAsync();
            var deductionData = await _context.DeductionsDetails
                                .Include(dd => dd.DeductionType)
                                .Select(dd => new
                                {
                                    DeductionTypeName = dd.DeductionType.Name,
                                    Percentage = dd.Percentage ?? 0
                                })
                                .Distinct()
                                .ToListAsync();

            int maxAllowances = allowanceData.Any() ? allowanceData.Max(a => a.Allowances.Count) : 0;
            int maxIdLength = employeeData.Any() ? employeeData.Max(e => e.EmployeeId.ToString().Length) : 0;

            var uniqueAllowanceTypes = allowanceData
                .SelectMany(a => a.Allowances)
                .Select(a => a.AllowanceName)
                .Distinct()
                .OrderBy(name => name) // Sắp xếp nếu bạn muốn
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
            worksheet.Cells["C1"].Value = "Mã Nhân viên";
            worksheet.Cells["D1"].Value = "Họ tên nhân viên";
            worksheet.Cells["E1"].Value = "Chức vụ";
            worksheet.Cells["F1"].Value = "Giới tính";
            worksheet.Cells["G1"].Value = "Số công";
            worksheet.Cells["H1"].Value = "Số giờ làm";
            worksheet.Cells["I1"].Value = "Lương cơ bản";
            worksheet.Cells["J1"].Value = "Lương thực tế";

            int allowanceHeaderStart = 11; // Kí tự K trong bảng Excel
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
                deductionHeaderEnd = deductionHeaderStart; // Điều chỉnh để tránh lỗi
            }
            int reductionHeaderStart = deductionHeaderEnd + 1; // Chỉ số cột bắt đầu của các khoản giảm trừ
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

            int allowanceColumnIndex = allowanceHeaderStart;
            foreach (var allowanceName in uniqueAllowanceTypes)
            {
                worksheet.Cells[2, allowanceColumnIndex].Value = allowanceName;
                allowanceColumnIndex++;
            }

            // Thêm tiêu đề cột cho các phụ cấp vào Excel
            decimal totalDeductionPercentage = 0m;

            foreach (var deduction in deductionData)
            {
                // Chuyển đổi trực tiếp từ double sang decimal
                decimal percentage = Convert.ToDecimal(deduction.Percentage);
                totalDeductionPercentage += percentage;
            }



            int row = 3;
            foreach (var data in employeeData)
            {
                var basicSalary = basicSalaries.FirstOrDefault(s => s.EmployeeId == data.EmployeeId)?.BasicSalary ?? 0;
                var actualSalary = actualSalaries.GetValueOrDefault(data.EmployeeId, 0);
                var allowances = allowanceData.FirstOrDefault(a => a.EmployeeId == data.EmployeeId)?.Allowances;
                var contractAmount = actualSalaries.GetValueOrDefault(data.EmployeeId, 0);
                const decimal familyAllowance = 11000000;
                decimal insurancePercentage = (decimal)_context.DeductionsDetails
                    .Where(dd => dd.DeductionType.Name.ToLower().Contains("insurance"))
                    .Sum(dd => dd.Percentage ?? 0);
                
                
                // Tính Người phụ thuộc
                int numberOfDependents = _context.Dependents.Count(d => d.EmployeeId == data.EmployeeId && (d.EndDate == null || d.EndDate >= DateTime.Today));
                decimal dependentAllowance = numberOfDependents * 4400000;

                // Tính Bảo hiểm
                decimal totalInsurancePercentage = (decimal)_context.DeductionsDetails
                    .Where(dd => dd.DeductionType.Name.ToLower().Contains("insurance"))
                    .Sum(dd => dd.Percentage ?? 0);
                decimal insuranceAmount = actualSalaries.GetValueOrDefault(data.EmployeeId, 0) * totalDeductionPercentage;
                int insuranceColumnIndex = deductionHeaderEnd + 1;
                int familyAllowanceColumnIndex = insuranceColumnIndex + 1;
                int dependentColumnIndex = familyAllowanceColumnIndex + 1;
                int insuranceHeaderIndex = deductionHeaderEnd + 1;
                int familyAllowanceHeaderIndex = insuranceHeaderIndex + 1;
                int dependentHeaderIndex = familyAllowanceHeaderIndex + 1;


                worksheet.Cells[row, 1].Value = row - 2;
                worksheet.Cells[row, 2].Value = $"{month}/{year}";
                worksheet.Cells[row, 3].Value = data.EmployeeId.ToString($"D{maxIdLength}");
                worksheet.Cells[row, 4].Value = data.FullName;
                worksheet.Cells[row, 5].Value = data.Role;
                worksheet.Cells[row, 6].Value = data.Gender == true ? "Nam" : "Nữ";
                worksheet.Cells[row, 7].Value = data.WorkDays.Count() != 0 ? (object)data.WorkDays.Count() : "-";
                worksheet.Cells[row, 8].Value = data.TotalHours != 0 ? (object)data.TotalHours : "-";
                worksheet.Cells[row, 9].Value = actualSalary != 0 ? (object)actualSalary : "-";
                worksheet.Cells[row, 10].Value = basicSalary != 0 ? (object)basicSalary : "-";
                worksheet.Cells[row, insuranceHeaderIndex].Value = insuranceAmount != 0 ? (object)insuranceAmount : "-";

                allowanceColumnIndex = allowanceHeaderStart;
                foreach (var allowanceType in uniqueAllowanceTypes)
                {
                    var amount = allowances?.FirstOrDefault(a => a.AllowanceName == allowanceType)?.Amount ?? 0;
                    worksheet.Cells[row, allowanceColumnIndex].Value = amount != 0 ? (object)amount : "-";
                    allowanceColumnIndex++;
                }

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
