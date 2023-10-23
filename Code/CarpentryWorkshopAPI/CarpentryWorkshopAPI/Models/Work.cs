﻿using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Work
    {
        public Work()
        {
            Teams = new HashSet<Team>();
        }

        public int WorkId { get; set; }
        public string? WorkName { get; set; }
        public int? ProductPackage { get; set; }
        public int? UniCostId { get; set; }
        public DateTime? Date { get; set; }
        public int? WorkAreaId { get; set; }

        public virtual UnitCost? UniCost { get; set; }
        public virtual WorkArea? WorkArea { get; set; }

        public virtual ICollection<Team> Teams { get; set; }
    }
}
