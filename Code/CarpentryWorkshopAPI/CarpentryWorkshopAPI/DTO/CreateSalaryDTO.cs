namespace CarpentryWorkshopAPI.DTO
{
    public class CreateSalaryDTO
    {
        public int SalaryId { get; set; }
        public double? SalaryName { get; set; }
        public int? SalaryDetailId { get; set; }
        public double? AmountOfMoney { get; set; }
        public int? EmloyeeId { get; set; }
        public string StartDateString { get; set; }
        public string EndDateString { get; set; }
    }
}
