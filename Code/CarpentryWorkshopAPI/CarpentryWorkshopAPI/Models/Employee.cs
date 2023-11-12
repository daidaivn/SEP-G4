using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Employee
    {
        public Employee()
        {
            CheckInOuts = new HashSet<CheckInOut>();
            Contracts = new HashSet<Contract>();
            Dependents = new HashSet<Dependent>();
            EmployeeDegrees = new HashSet<EmployeeDegree>();
            EmployeeTeams = new HashSet<EmployeeTeam>();
            EmployeesStatusHistories = new HashSet<EmployeesStatusHistory>();
            RolesEmployees = new HashSet<RolesEmployee>();
            SalaryDetails = new HashSet<SalaryDetail>();
        }

        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Dob { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TaxId { get; set; }
        public string? Email { get; set; }
        public int? CountryId { get; set; }
        public bool? Status { get; set; }
        public string? Cic { get; set; }

        public virtual Country? Country { get; set; }
        public virtual UserAccount? UserAccount { get; set; }
        public virtual ICollection<CheckInOut> CheckInOuts { get; set; }
        public virtual ICollection<Contract> Contracts { get; set; }
        public virtual ICollection<Dependent> Dependents { get; set; }
        public virtual ICollection<EmployeeDegree> EmployeeDegrees { get; set; }
        public virtual ICollection<EmployeeTeam> EmployeeTeams { get; set; }
        public virtual ICollection<EmployeesStatusHistory> EmployeesStatusHistories { get; set; }
        public virtual ICollection<RolesEmployee> RolesEmployees { get; set; }
        public virtual ICollection<SalaryDetail> SalaryDetails { get; set; }
    }
}
