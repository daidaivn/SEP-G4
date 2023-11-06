using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SalarySalaryDetail
    {
        public int SlarySalaryDetailId { get; set; }
        public int? SalaryId { get; set; }
        public int? SalaryDetailId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? EmployeeId { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual Salary? Salary { get; set; }
        public virtual SalaryDetail? SalaryDetail { get; set; }
    }
}
