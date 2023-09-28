namespace CarpentryWorkshopAPI.DTO
{
    public class DependentDTO
    {
        public int DependentId { get; set; }
        public int? EmployeeId { get; set; }
        public string? FullName { get; set; }
        public string? IdentifierCode { get; set; }
        public bool? Gender { get; set; }
        public string? Relationship { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? IdentifierName { get; set; }
    }
}
