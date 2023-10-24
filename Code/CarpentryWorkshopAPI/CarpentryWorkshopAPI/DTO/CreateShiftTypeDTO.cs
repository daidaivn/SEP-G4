namespace CarpentryWorkshopAPI.DTO
{
    public class CreateShiftTypeDTO
    {
        public int ShiftTypeId { get; set; }
        public string? TypeName { get; set; }
        public bool? Status { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
    }
}
