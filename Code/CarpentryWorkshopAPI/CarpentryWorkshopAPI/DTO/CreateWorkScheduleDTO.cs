namespace CarpentryWorkshopAPI.DTO
{
    public class CreateWorkScheduleDTO
    {
        public int WorkScheduleId { get; set; }
        public int? ShiftTypeId { get; set; }
        public int? TeamId { get; set; }
        public bool? Status { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
    }
}
