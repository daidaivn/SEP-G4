using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Department
    {
        public Department()
        {
            DepartmentsStatusHistories = new HashSet<DepartmentsStatusHistory>();
            Employees = new HashSet<Employee>();
        }

        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<DepartmentsStatusHistory> DepartmentsStatusHistories { get; set; }
        public virtual ICollection<Employee> Employees { get; set; }
    }
}
