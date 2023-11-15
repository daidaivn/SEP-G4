using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class WorkSchedule
    {
        public WorkSchedule()
        {
            WorkScheduleStatusHistories = new HashSet<WorkScheduleStatusHistory>();
        }

        public int WorkScheduleId { get; set; }
        public int? ShiftTypeId { get; set; }
        public int? TeamId { get; set; }
        public bool? Status { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual ShiftType? ShiftType { get; set; }
        public virtual Team? Team { get; set; }
        public virtual ICollection<WorkScheduleStatusHistory> WorkScheduleStatusHistories { get; set; }
    }
}
