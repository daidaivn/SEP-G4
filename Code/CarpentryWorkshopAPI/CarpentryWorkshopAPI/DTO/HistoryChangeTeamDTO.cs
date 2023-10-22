namespace CarpentryWorkshopAPI.DTO
{
    public class HistoryChangeTeamDTO
    {
        public int HistoryId { get; set; }
        public string? TeamName { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
