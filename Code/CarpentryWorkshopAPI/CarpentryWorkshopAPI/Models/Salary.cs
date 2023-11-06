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
        public string? SalaryName { get; set; }
        public int? SalaryDetailId { get; set; }
        public double? AmountOfMoney { get; set; }
        public int? EmloyeeIdInput { get; set; }
        public int? MonthSalary { get; set; }
        public int? Year { get; set; }

        public virtual ICollection<SalarySalaryDetail> SalarySalaryDetails { get; set; }
    }
}
