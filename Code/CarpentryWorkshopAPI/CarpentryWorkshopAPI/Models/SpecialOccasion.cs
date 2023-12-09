namespace CarpentryWorkshopAPI.Models
{
    public partial class SpecialOccasion
    {
        public int OccasionId { get; set; }
        public int? EmployeeId { get; set; }
        public string? OccasionType { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? OccasionDate { get; set; }
        public string? OccasionNote { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
