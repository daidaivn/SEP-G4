using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class EmployeesStatusHistory
    {
        public int HistoryId { get; set; }
        public int? EmployeeId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
