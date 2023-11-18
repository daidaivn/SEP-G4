namespace CarpentryWorkshopAPI.DTO
{
    public class ExcelSalaryDTO
    {
        public int STT { get; set; }
        public string MonthYear { get; set; }
        public string EmployeeCode { get; set; }
        public string EmployeeName { get; set; }
        public string Position { get; set; } // Chức vụ, giả sử từ bảng khác
        public string Gender { get; set; }
        public int TotalWorkDays { get; set; }
        public double TotalWorkHours { get; set; }
    }
}
