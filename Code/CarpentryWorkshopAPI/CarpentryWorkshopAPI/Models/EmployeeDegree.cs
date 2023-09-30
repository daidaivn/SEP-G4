using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class EmployeeDegree
    {
        public int? DegreeId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? GraduationDate { get; set; }

        public virtual Degree? Degree { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
