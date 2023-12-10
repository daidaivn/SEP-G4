using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class DependentsStatusHistory
    {
        public int HistoryId { get; set; }
        public int? DependentId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Dependent? Dependent { get; set; }
    }
}
