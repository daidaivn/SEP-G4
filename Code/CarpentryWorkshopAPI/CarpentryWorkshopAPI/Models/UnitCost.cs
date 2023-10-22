using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class UnitCost
    {
        public UnitCost()
        {
            UnitCostStatusHistories = new HashSet<UnitCostStatusHistory>();
            Works = new HashSet<Work>();
        }

        public int UniCostId { get; set; }
        public string? UnitName { get; set; }
        public double? Cost { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<UnitCostStatusHistory> UnitCostStatusHistories { get; set; }
        public virtual ICollection<Work> Works { get; set; }
    }
}
