using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SalaryDetail
    {
        public SalaryDetail()
        {
            Salaries = new HashSet<Salary>();
        }

        public int SalaryDetailId { get; set; }
        public double? Amount { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? SalaryTypeId { get; set; }

        public virtual SalaryType? SalaryType { get; set; }
        public virtual ICollection<Salary> Salaries { get; set; }
    }
}
