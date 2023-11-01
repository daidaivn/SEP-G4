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
        public string? DobString { get; set; }
        public string? StartDateString { get; set; }
        public string? EndDateString { get; set; }
        public string? IdentifierName { get; set; }
        public bool? Status { get; set; }
        public string? NoteReason { get; set; }
        public int? TypeDependentId { get; set; }
    }
}
