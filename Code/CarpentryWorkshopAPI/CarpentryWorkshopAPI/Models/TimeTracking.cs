using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class TimeTracking
    {
        public TimeTracking()
        {
            HistoryChangeTimeTrackings = new HashSet<HistoryChangeTimeTracking>();
        }

        public int TimeTrackingId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? CheckIn { get; set; }
        public DateTime? CheckOut { get; set; }
        public string? Note { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual ICollection<HistoryChangeTimeTracking> HistoryChangeTimeTrackings { get; set; }
    }
}
