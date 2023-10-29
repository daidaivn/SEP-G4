using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Team
    {
        public Team()
        {
            EmployeeTeams = new HashSet<EmployeeTeam>();
            HistoryChangeTeams = new HashSet<HistoryChangeTeam>();
            WorkSchedules = new HashSet<WorkSchedule>();
            Works = new HashSet<Work>();
        }

        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? TeamLeaderId { get; set; }
        public string? Note { get; set; }
        public int? TeamSubLeaderId { get; set; }

        public virtual ICollection<EmployeeTeam> EmployeeTeams { get; set; }
        public virtual ICollection<HistoryChangeTeam> HistoryChangeTeams { get; set; }
        public virtual ICollection<WorkSchedule> WorkSchedules { get; set; }

        public virtual ICollection<Work> Works { get; set; }
    }
}
