using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Work
    {
        public int WorkId { get; set; }
        public string? WorkName { get; set; }
        public int? ProductPackage { get; set; }
        public int? UniCostId { get; set; }
        public int? TeamId { get; set; }
        public DateTime? Date { get; set; }
        public int? WorkAreaId { get; set; }

        public virtual Team? Team { get; set; }
        public virtual UnitCost? UniCost { get; set; }
        public virtual WorkArea? WorkArea { get; set; }
    }
}
