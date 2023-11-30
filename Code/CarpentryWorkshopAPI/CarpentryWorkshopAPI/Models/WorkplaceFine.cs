using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class WorkplaceFine
    {
        public int WorkplaceFineId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Date { get; set; }
        public string? Note { get; set; }
        public bool? Status { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
