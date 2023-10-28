﻿namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeDetailBasicDTO
    {
        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FullName { get; set; }
        public string? Dobstring { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public int? TaxId { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public bool? Status { get; set; }
        public string? Cic { get; set; }
        public string? MainRole { get; set; }
        public List<string> SubRoles { get; set; }
        public List<string> Departments { get; set; }
    }
}
