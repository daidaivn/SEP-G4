namespace CarpentryWorkshopAPI.DTO
{
    public class SalaryListDTO
    {
        public int SalaryId { get; set; }
        public double? SalaryName { get; set; }
        public int? SalaryDetailId { get; set; }
        public double? AmountOfMoney { get; set; }
        public string? EmloyeeName { get; set; }
        public string? StartDateString { get; set; }
        public string? EndDateString { get; set; }
    }
}
