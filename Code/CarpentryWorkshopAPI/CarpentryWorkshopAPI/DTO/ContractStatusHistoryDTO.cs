namespace CarpentryWorkshopAPI.DTO
{
    public class ContractStatusHistoryDTO
    {
        public int HistoryId { get; set; }
        public int? ContractId { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
