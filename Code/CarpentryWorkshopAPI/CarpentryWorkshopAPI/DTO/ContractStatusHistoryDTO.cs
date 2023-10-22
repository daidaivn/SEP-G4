namespace CarpentryWorkshopAPI.DTO
{
    public class ContractStatusHistoryDTO
    {
        public int HistoryId { get; set; }
        public string? ContractName { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
