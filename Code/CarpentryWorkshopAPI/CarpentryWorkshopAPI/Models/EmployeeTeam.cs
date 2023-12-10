using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class EmployeeTeam
    {
        public int EmployeeTeamId { get; set; }
        public int EmployeeId { get; set; }
        public int TeamId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual Team Team { get; set; } = null!;
    }
}
