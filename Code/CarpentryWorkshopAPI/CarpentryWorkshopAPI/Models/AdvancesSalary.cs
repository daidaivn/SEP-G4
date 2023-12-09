namespace CarpentryWorkshopAPI.Models
{
    public partial class AdvancesSalary
    {
        public int AdvanceSalaryId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Date { get; set; }
        public string? Note { get; set; }
        public bool? Status { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
