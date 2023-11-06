using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class RelationshipType
    {
        public RelationshipType()
        {
            Dependents = new HashSet<Dependent>();
        }

        public int RelationshipId { get; set; }
        public string? RelationshipName { get; set; }
        public string? Note { get; set; }

        public virtual ICollection<Dependent> Dependents { get; set; }
    }
}
