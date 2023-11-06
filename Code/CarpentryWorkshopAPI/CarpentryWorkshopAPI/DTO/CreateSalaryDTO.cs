namespace CarpentryWorkshopAPI.DTO
{
    public class CreateSalaryDTO
    {
        public int SalaryId { get; set; }
        public string? SalaryName { get; set; }
        public int? SalaryDetailId { get; set; }
        public double? AmountOfMoney { get; set; }
        public int? EmloyeeIdInput { get; set; }
        public int? MonthSalary { get; set; }
        public int? Year { get; set; }
    }
}
