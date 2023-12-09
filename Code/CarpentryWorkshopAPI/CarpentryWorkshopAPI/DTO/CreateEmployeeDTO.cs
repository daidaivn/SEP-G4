﻿namespace CarpentryWorkshopAPI.DTO
{
    public class CreateEmployeeDTO
    {
        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Dobstring { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TaxId { get; set; }
        public string? Email { get; set; }
        public int? CountryId { get; set; }
        public bool? Status { get; set; }
        public string? Cic { get; set; }
        public List<RD> rDs { get; set; }

        public class RD
        {
            public int RoleID { get; set; }
            public int DepartmentID { get; set; }
        }

    }
}
