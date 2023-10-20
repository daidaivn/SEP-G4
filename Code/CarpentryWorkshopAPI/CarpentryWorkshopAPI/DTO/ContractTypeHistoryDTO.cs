namespace CarpentryWorkshopAPI.DTO
{
    public class ContractTypeHistoryDTO
    {
        public int HistoryId { get; set; }
        public string? ContractTypeName { get; set; }
        public string? Action { get; set; }
        public string? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
