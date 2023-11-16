using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Subsidy
    {
        public int SubsidyId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? SubsidyAmountId { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual SubsidyAmount? SubsidyAmount { get; set; }
    }
}
