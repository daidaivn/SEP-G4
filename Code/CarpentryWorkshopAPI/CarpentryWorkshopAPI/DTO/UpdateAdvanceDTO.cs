namespace CarpentryWorkshopAPI.DTO
{
    public class UpdateAdvanceDTO
    {
        public int AdvanceSalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? Amount { get; set; }
        public string? Datestring { get; set; }
        public string? Note { get; set; }
        public bool? Status { get; set; }
    }
}
