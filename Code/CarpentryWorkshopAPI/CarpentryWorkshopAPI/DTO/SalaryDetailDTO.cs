namespace CarpentryWorkshopAPI.DTO
{
    public class SalaryDetailDTO
    {
        public int SalaryDetailId { get; set; }
        public double? Amount { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
        public string? SalaryTypeName { get; set; }
    }
}
