namespace CarpentryWorkshopAPI.DTO
{
    public class CreateTeamDTO
    {
        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? WorkScheduleId { get; set; }
    }
}
