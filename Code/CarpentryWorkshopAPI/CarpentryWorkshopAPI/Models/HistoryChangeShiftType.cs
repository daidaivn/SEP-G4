namespace CarpentryWorkshopAPI.Models
{
    public partial class HistoryChangeShiftType
    {
        public int HistoryId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }
        public int? ShiftTypeId { get; set; }

        public virtual ShiftType? ShiftType { get; set; }
    }
}
