namespace CarpentryWorkshopAPI.DTO
{
    public class CreateTeamDTO
    {
        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? WorkAreaId { get; set; }
        public int? TeamLeaderId { get; set; }
        public string? Note { get; set; }
    }
}
