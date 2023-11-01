using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SalarySalaryDetail
    {
        public int SalarySalaryDetailId { get; set; }
        public int SalaryId { get; set; }
        public int? SalaryDetailId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Salary Salary { get; set; } = null!;
        public virtual SalaryDetail? SalaryDetail { get; set; }
    }
}
