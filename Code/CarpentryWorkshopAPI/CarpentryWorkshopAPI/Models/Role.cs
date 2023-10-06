using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Role
    {
        public Role()
        {
            RolesEmployees = new HashSet<RolesEmployee>();
            RolesStatusHistories = new HashSet<RolesStatusHistory>();
            Pages = new HashSet<Page>();
        }

        public int RoleId { get; set; }
        public string? RoleName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<RolesEmployee> RolesEmployees { get; set; }
        public virtual ICollection<RolesStatusHistory> RolesStatusHistories { get; set; }

        public virtual ICollection<Page> Pages { get; set; }
    }
}
