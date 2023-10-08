namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeHistoryDTO
    {
        public int HistoryId { get; set; }
        public string? EmployeeName { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
