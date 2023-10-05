using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class EmployeeDegree
    {
        public int? DegreeId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? GraduateDate { get; set; }
        public string? Major { get; set; }
        public string? School { get; set; }
        public string? LinkDoc { get; set; }

        public virtual Degree? Degree { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
