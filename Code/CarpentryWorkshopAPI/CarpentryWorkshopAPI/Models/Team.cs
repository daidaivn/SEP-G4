namespace CarpentryWorkshopAPI.Models
{
    public partial class Team
    {
        public Team()
        {
            EmployeeTeams = new HashSet<EmployeeTeam>();
            HistoryChangeTeams = new HashSet<HistoryChangeTeam>();
            HourWorkTeams = new HashSet<HourWorkTeam>();
            TeamWorks = new HashSet<TeamWork>();
            WorkSchedules = new HashSet<WorkSchedule>();
        }

        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? TeamLeaderId { get; set; }
        public string? Note { get; set; }
        public int? TeamSubLeaderId { get; set; }

        public virtual ICollection<EmployeeTeam> EmployeeTeams { get; set; }
        public virtual ICollection<HistoryChangeTeam> HistoryChangeTeams { get; set; }
        public virtual ICollection<HourWorkTeam> HourWorkTeams { get; set; }
        public virtual ICollection<TeamWork> TeamWorks { get; set; }
        public virtual ICollection<WorkSchedule> WorkSchedules { get; set; }
    }
}
