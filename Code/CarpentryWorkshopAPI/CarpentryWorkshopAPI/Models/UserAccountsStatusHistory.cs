namespace CarpentryWorkshopAPI.Models
{
    public partial class UserAccountsStatusHistory
    {
        public int HistoryId { get; set; }
        public int? EmployeeId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual UserAccount? Employee { get; set; }
    }
}
