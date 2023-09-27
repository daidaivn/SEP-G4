﻿namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeSearchDTO
    {
        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FullName { get; set; }
        public DateTime? Dob { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Cic { get; set; }
        public int? CountryId { get; set; }
        public int? DepartmentId { get; set; }
        public bool? Status { get; set; }
    }
}
