using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HistoryChangeTimeTracking
    {
        public int HistoryId { get; set; }
        public int? TimeTrackingId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual TimeTracking? TimeTracking { get; set; }
    }
}
