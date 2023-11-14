using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class AllowanceDetail
    {
        public int SalaryDetailId { get; set; }
        public double? Amount { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? AllowanceTypeId { get; set; }
        public int? EmployeeId { get; set; }

        public virtual AllowanceType? AllowanceType { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
