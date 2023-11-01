using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SalaryDetail
    {
        public SalaryDetail()
        {
            SalarySalaryDetails = new HashSet<SalarySalaryDetail>();
        }

        public int SalaryDetailId { get; set; }
        public double? Amount { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? SalaryTypeId { get; set; }

        public virtual SalaryType? SalaryType { get; set; }
        public virtual ICollection<SalarySalaryDetail> SalarySalaryDetails { get; set; }
    }
}
