namespace CarpentryWorkshopAPI.DTO
{
    public class HistoryChangeTimeTrackingDTO
    {
        public int HistoryId { get; set; }
        public int? TimeTrackingId { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
