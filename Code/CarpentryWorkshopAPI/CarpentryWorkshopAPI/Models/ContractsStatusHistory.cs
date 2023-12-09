namespace CarpentryWorkshopAPI.Models
{
    public partial class ContractsStatusHistory
    {
        public int HistoryId { get; set; }
        public int? ContractId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Contract? Contract { get; set; }
    }
}
