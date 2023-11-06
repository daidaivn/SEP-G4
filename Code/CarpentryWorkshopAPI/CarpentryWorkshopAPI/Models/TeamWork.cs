using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class TeamWork
    {
        public int TeamWorkId { get; set; }
        public int? TeamId { get; set; }
        public int? WorkId { get; set; }
        public int? TotalProduct { get; set; }
        public DateTime? Date { get; set; }

        public virtual Team? Team { get; set; }
        public virtual Work? Work { get; set; }
    }
}
