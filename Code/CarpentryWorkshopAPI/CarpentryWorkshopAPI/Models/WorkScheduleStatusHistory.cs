using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class WorkScheduleStatusHistory
    {
        public int HistoryId { get; set; }
        public int? WorkScheduleId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual WorkSchedule? WorkSchedule { get; set; }
    }
}
