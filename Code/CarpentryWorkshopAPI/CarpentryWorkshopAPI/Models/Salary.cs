using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Salary
    {
        public int SalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? TotalSalary { get; set; }
        public DateTime? PayDate { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
