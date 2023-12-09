namespace CarpentryWorkshopAPI.DTO
{
    public class CreateAdvanceDTO
    {
        public int AdvanceSalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? Amount { get; set; }
        public string? Note { get; set; }
        public bool? Status { get; set; }
        public MonthYear? my { get; set; }
        public class MonthYear
        {
            public int Month { get; set; }
            public int Year { get; set; }
        }
    }
}
