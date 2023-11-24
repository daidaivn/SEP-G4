namespace CarpentryWorkshopAPI.DTO
{
    public class WorkScheduleDTO
    {
        public int WorkScheduleId { get; set; }
        public string? ShiftTypeName { get; set; }
        public string? TeamName { get; set; }
        public bool? Status { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
    }
}
