using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class WorkArea
    {
        public WorkArea()
        {
            Works = new HashSet<Work>();
        }

        public int WorkAreaId { get; set; }
        public string? WorkAreaName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Work> Works { get; set; }
    }
}
