namespace CarpentryWorkshopAPI.DTO
{
    public class WorkScheduleDTO
    {
        public int WorkScheduleId { get; set; }
        public int? ShiftTypeId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool? Status { get; set; }
    }
}
