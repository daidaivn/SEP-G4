using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class WorkSchedule
    {
        public WorkSchedule()
        {
            Teams = new HashSet<Team>();
            WorkScheduleStatusHistories = new HashSet<WorkScheduleStatusHistory>();
        }

        public int WorkScheduleId { get; set; }
        public int? ShiftTypeId { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public bool? Status { get; set; }

        public virtual ShiftType? ShiftType { get; set; }
        public virtual ICollection<Team> Teams { get; set; }
        public virtual ICollection<WorkScheduleStatusHistory> WorkScheduleStatusHistories { get; set; }
    }
}
