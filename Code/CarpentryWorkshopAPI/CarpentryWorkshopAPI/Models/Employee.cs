﻿using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Contracts = new HashSet<Contract>();
            Dependents = new HashSet<Dependent>();
            EmployeesStatusHistories = new HashSet<EmployeesStatusHistory>();
            RolesEmployees = new HashSet<RolesEmployee>();
        }

        public int EmployeeId { get; set; }
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Dob { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public int? TaxId { get; set; }
        public string? Email { get; set; }
        public int? CountryId { get; set; }
        public bool? Status { get; set; }
        public string? Cic { get; set; }

        public virtual Country? Country { get; set; }
        public virtual UserAccount? UserAccount { get; set; }
        public virtual ICollection<Contract> Contracts { get; set; }
        public virtual ICollection<Dependent> Dependents { get; set; }
        public virtual ICollection<EmployeesStatusHistory> EmployeesStatusHistories { get; set; }
        public virtual ICollection<RolesEmployee> RolesEmployees { get; set; }
    }
}
