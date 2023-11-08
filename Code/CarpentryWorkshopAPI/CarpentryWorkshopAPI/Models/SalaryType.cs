using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SalaryType
    {
        public SalaryType()
        {
            SalaryDetails = new HashSet<SalaryDetail>();
        }

        public int SalaryTypeId { get; set; }
        public string? Name { get; set; }
        public int? SalaryGroupTypeId { get; set; }

        public virtual SalaryGroupType? SalaryGroupType { get; set; }
        public virtual ICollection<SalaryDetail> SalaryDetails { get; set; }
    }
}
