namespace CarpentryWorkshopAPI.DTO
{
    public class CreateShiftTypeDTO
    {
        public int ShiftTypeId { get; set; }
        public string? TypeName { get; set; }
        public bool? Status { get; set; }
        public string? StartTimestring { get; set; }
        public string? EndTimestring { get; set; }
    }
}
