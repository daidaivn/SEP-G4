namespace CarpentryWorkshopAPI.DTO
{
    public class WageStatusHistoryDTO
    {
        public int HistoryId { get; set; }
        public int? WageId { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
