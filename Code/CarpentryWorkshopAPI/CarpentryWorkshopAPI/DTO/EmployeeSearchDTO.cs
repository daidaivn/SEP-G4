﻿namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeSearchDTO
    {
        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Dob { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public int? TaxId { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public bool? Status { get; set; }
        public string? Cic { get; set; }
    }
}
