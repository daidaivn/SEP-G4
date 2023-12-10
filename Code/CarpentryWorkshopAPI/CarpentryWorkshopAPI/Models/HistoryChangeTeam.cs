using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HistoryChangeTeam
    {
        public int HistoryId { get; set; }
        public int? TeamId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Team? Team { get; set; }
    }
}
