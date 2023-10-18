namespace CarpentryWorkshopAPI.DTO
{
    public class HistoryChangeTeamDTO
    {
        public int HistoryId { get; set; }
        public string? TeamName { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
