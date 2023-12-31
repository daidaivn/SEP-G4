﻿namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeDetailBasicDTO
    {
        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FullName { get; set; }
        public string? Dobstring { get; set; }
        public bool? Gender { get; set; }
        public string? Genderstring { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TaxId { get; set; }
        public string? Email { get; set; }
        public string? Country { get; set; }
        public int? CountryId { get; set; }
        public bool? Status { get; set; }
        public string? Cic { get; set; }
        public decimal? BasicSalary { get; set; }
        public List<RoleDepartment> RoleDepartments { get; set; }
        public class RoleDepartment
        {
            public int RoleID { get; set; }
            public string RoleName { get; set; }
            public int DepartmentID { get; set; }
            public string DepartmentName { get; set; }
        }
    }
}
