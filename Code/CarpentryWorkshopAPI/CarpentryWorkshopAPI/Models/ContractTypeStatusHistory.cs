namespace CarpentryWorkshopAPI.Models
{
    public partial class ContractTypeStatusHistory
    {
        public int HistoryId { get; set; }
        public int? ContractTypeId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual ContractType? ContractType { get; set; }
    }
}
