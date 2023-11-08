using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class SalaryGroupType
    {
        public SalaryGroupType()
        {
            SalaryTypes = new HashSet<SalaryType>();
        }

        public int Id { get; set; }
        public string? Name { get; set; }

        public virtual ICollection<SalaryType> SalaryTypes { get; set; }
    }
}
