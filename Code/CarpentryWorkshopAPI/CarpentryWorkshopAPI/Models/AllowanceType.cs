using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class AllowanceType
    {
        public AllowanceType()
        {
            AllowanceDetails = new HashSet<AllowanceDetail>();
        }

        public int AllowanceTypeId { get; set; }
        public string? Name { get; set; }
        public int? AllowanceId { get; set; }

        public virtual Allowance? Allowance { get; set; }
        public virtual ICollection<AllowanceDetail> AllowanceDetails { get; set; }
    }
}
