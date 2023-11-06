using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Work
    {
        public Work()
        {
            TeamWorks = new HashSet<TeamWork>();
        }

        public int WorkId { get; set; }
        public string? WorkName { get; set; }
        public int? TotalProduct { get; set; }
        public int? UniCostId { get; set; }
        public int? WorkAreaId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual UnitCost? UniCost { get; set; }
        public virtual WorkArea? WorkArea { get; set; }
        public virtual ICollection<TeamWork> TeamWorks { get; set; }
    }
}
