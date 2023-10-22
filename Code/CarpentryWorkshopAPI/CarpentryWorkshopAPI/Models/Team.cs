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
            Works = new HashSet<Work>();
        }

        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? WorkScheduleId { get; set; }
        public int? WorkAreaId { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual WorkSchedule? WorkSchedule { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<HistoryChangeTeam> HistoryChangeTeams { get; set; }
        public virtual ICollection<Work> Works { get; set; }
    }
}
