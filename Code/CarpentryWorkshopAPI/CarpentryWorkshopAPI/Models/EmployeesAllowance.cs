using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class EmployeesAllowance
    {
        public int AllowanceTypeId { get; set; }
        public int EmployeeId { get; set; }
        public bool? Status { get; set; }

        public virtual AllowanceType AllowanceType { get; set; } = null!;
        public virtual Employee Employee { get; set; } = null!;
    }
}
