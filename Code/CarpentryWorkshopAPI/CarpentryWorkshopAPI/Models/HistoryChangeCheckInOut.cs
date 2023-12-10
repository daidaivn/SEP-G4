using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HistoryChangeCheckInOut
    {
        public int HistoryId { get; set; }
        public int? CheckInOutId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual CheckInOut? CheckInOut { get; set; }
    }
}
