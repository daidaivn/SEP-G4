﻿namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeDependentDTO
    {
        public int DependentId { get; set; }
        public int? EmployeeId { get; set; }
        public string? FullName { get; set; }
        public string? IdentifierCode { get; set; }
        public bool? Gender { get; set; }
        public string? Relationship { get; set; }
        public string? Dobstring { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
        public string? IdentifierName { get; set; }
        public bool? Status { get; set; }
        public string? NoteReason { get; set; }
    }
}
