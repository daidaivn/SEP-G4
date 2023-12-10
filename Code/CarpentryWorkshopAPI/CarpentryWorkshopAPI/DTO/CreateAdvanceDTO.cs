namespace CarpentryWorkshopAPI.DTO
{
    public class CreateAdvanceDTO
    {
        public int AdvanceSalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? Amount { get; set; }
        public string? Note { get; set; }
        public bool? Status { get; set; }
       
    }
}
