namespace CarpentryWorkshopAPI.DTO
{
    public class CreateSalaryDetailDTO
    {
        public int SalaryDetailId { get; set; }
        public double? Amount { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
        public int? SalaryTypeId { get; set; }
    }
}
