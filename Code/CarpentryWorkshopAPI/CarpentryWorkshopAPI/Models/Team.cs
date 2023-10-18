using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Team
    {
        public Team()
        {
            Employees = new HashSet<Employee>();
            HistoryChangeTeams = new HashSet<HistoryChangeTeam>();
        }

        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? WorkScheduleId { get; set; }

        public virtual WorkSchedule? WorkSchedule { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<HistoryChangeTeam> HistoryChangeTeams { get; set; }
    }
}
