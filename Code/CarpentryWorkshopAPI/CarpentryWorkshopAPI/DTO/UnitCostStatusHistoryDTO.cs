namespace CarpentryWorkshopAPI.DTO
{
    public class UnitCostStatusHistoryDTO
    {
        public int HistoryId { get; set; }
        public string? UniCostName { get; set; }
        public string? Action { get; set; }
        public string? ActionDatestring { get; set; }
        public string? CurrentEmployeeId { get; set; }
    }
}
