namespace CarpentryWorkshopAPI.DTO
{
    public class SpecialOccasionDTO
    {
        public int OccasionId { get; set; }
        public int? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public string? OccasionType { get; set; }
        public decimal? Amount { get; set; }
        public string? OccasionDateString { get; set; }
    }
}
