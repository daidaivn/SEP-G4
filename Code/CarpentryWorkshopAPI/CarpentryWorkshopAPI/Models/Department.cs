using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Department
    {
        public Department()
        {
            DepartmentsStatusHistories = new HashSet<DepartmentsStatusHistory>();
            RolesEmployees = new HashSet<RolesEmployee>();
        }

        public int DepartmentId { get; set; }
        public string? DepartmentName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<DepartmentsStatusHistory> DepartmentsStatusHistories { get; set; }
        public virtual ICollection<RolesEmployee> RolesEmployees { get; set; }
    }
}
