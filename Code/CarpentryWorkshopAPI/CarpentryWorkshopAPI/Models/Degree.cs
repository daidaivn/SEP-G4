using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Degree
    {
        public Degree()
        {
            DegreesStatusHistories = new HashSet<DegreesStatusHistory>();
        }

        public int DegreeId { get; set; }
        public string? DegreeName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<DegreesStatusHistory> DegreesStatusHistories { get; set; }
    }
}
