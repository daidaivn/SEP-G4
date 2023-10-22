namespace CarpentryWorkshopAPI.DTO
{
    public class HistoryChangeShiftTypeDTO
    {
        public int HistoryId { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
        public string? ShiftTypeName { get; set; }
    }
}
