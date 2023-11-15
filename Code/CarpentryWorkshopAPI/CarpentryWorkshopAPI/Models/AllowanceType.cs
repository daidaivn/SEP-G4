using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class AllowanceType
    {
        public AllowanceType()
        {
            HistoryAllowanceTypes = new HashSet<HistoryAllowanceType>();
            Employees = new HashSet<Employee>();
        }

        public int AllowanceTypeId { get; set; }
        public decimal? Amount { get; set; }
        public int? AllowanceId { get; set; }
        public DateTime? StartDate { get; set; }

        public virtual Allowance? Allowance { get; set; }
        public virtual ICollection<HistoryAllowanceType> HistoryAllowanceTypes { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
