namespace CarpentryWorkshopAPI.DTO
{
    public class DependentListDTO
    {
        public int DependentId { get; set; }
        public int? EmployeeId { get; set; }
        public string? EmployeesName { get; set; }
        public string? FullName { get; set; }
        public string? IdentifierCode { get; set; }
        public bool? Gender { get; set; }
        public string? GenderString { get; set; }
        public string? DobString { get; set; }
        public string? StartDateString { get; set; }
        public string? EndDateString { get; set; }
        public string? IdentifierName { get; set; }
        public bool? Status { get; set; }
        public string? NoteReason { get; set; }
        public string? Relation { get; set; }
        public int? RelationshipId { get; set; }
        public string? RelationshipName { get; set; }
    }
}
