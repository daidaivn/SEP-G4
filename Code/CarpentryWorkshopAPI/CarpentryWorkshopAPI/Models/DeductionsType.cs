using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class DeductionsType
    {
        public DeductionsType()
        {
            DeductionsDetails = new HashSet<DeductionsDetail>();
        }

        public int DeductionTypeId { get; set; }
        public string? Name { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<DeductionsDetail> DeductionsDetails { get; set; }
    }
}
