using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class RolesEmployee
    {
        public int RoleEmployeeId { get; set; }
        public int? EmployeeId { get; set; }
        public int? RoleId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual Role? Role { get; set; }
    }
}
