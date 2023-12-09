namespace CarpentryWorkshopAPI.Models
{
    public partial class RolesStatusHistory
    {
        public int HistoryId { get; set; }
        public int? RoleId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Role? Role { get; set; }
    }
}
