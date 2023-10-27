using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class WageStatusHistory
    {
        public int HistoryId { get; set; }
        public int? WageId { get; set; }
        public string? Action { get; set; }
        public string? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Wage? Wage { get; set; }
    }
}
