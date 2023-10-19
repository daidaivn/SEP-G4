namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeHistoryDTO
    {
        public int HistoryId { get; set; }
        public string? EmployeeName { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
