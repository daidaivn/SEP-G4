namespace CarpentryWorkshopAPI.DTO
{
    public class WorkShiftDTO
    {
        public int? ShiftTypeId { get; set; }
        public string? TypeName { get; set; }
        public int? WorkId { get; set; }
        public string? WorkName { get; set; }
        public string? WorkTime { get; set; }
        public DateTime? Date { get; set; }
        public string? Status { get; set; }
    }
}
