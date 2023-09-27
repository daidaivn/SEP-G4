using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Employee
    {
        public Employee()
        {
            EmployeeStatusHistories = new HashSet<EmployeeStatusHistory>();
            RolesEmployees = new HashSet<RolesEmployee>();
            UserAccounts = new HashSet<UserAccount>();
        }

        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Dob { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Cic { get; set; }
        public int? CountryId { get; set; }
        public int? DepartmentId { get; set; }
        public bool? Status { get; set; }

        public virtual Country? Country { get; set; }
        public virtual Department? Department { get; set; }
        public virtual ICollection<EmployeeStatusHistory> EmployeeStatusHistories { get; set; }
        public virtual ICollection<RolesEmployee> RolesEmployees { get; set; }
        public virtual ICollection<UserAccount> UserAccounts { get; set; }
    }
}
