namespace CarpentryWorkshopAPI.Models
{
    public partial class ShiftType
    {
        public ShiftType()
        {
            HistoryChangeShiftTypes = new HashSet<HistoryChangeShiftType>();
            WorkSchedules = new HashSet<WorkSchedule>();
        }

        public int ShiftTypeId { get; set; }
        public string? TypeName { get; set; }
        public bool? Status { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }

        public virtual ICollection<HistoryChangeShiftType> HistoryChangeShiftTypes { get; set; }
        public virtual ICollection<WorkSchedule> WorkSchedules { get; set; }
    }
}
