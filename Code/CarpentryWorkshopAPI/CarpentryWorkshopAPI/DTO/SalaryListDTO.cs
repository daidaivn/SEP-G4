namespace CarpentryWorkshopAPI.DTO
{
    public class SalaryListDTO
    {
        public int SalaryId { get; set; }
        public double? SalaryName { get; set; }
        public int? SalaryDetailId { get; set; }
        public double? AmountOfMoney { get; set; }
        public int? EmloyeeId { get; set; }
        public string EmployeeName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }


    }
}
