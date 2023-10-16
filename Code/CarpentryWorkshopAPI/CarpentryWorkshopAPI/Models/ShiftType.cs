using System;
using System.Collections.Generic;

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
        public double? HourWork { get; set; }

        public virtual ICollection<HistoryChangeShiftType> HistoryChangeShiftTypes { get; set; }
        public virtual ICollection<WorkSchedule> WorkSchedules { get; set; }
    }
}
