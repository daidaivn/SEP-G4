using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Salary
    {
        public Salary()
        {
            SalarySalaryDetails = new HashSet<SalarySalaryDetail>();
        }

        public int SalaryId { get; set; }
        public double? SalaryName { get; set; }
        public int? SalaryDetailId { get; set; }
        public double? AmountOfMoney { get; set; }
        public int? EmloyeeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual Employee? Emloyee { get; set; }
        public virtual ICollection<SalarySalaryDetail> SalarySalaryDetails { get; set; }
    }
}
