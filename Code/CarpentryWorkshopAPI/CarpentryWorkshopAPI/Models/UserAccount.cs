using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class UserAccount
    {
        public UserAccount()
        {
            UserAccountsStatusHistories = new HashSet<UserAccountsStatusHistory>();
        }

        public int EmployeeId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public bool? Status { get; set; }

        public virtual Employee Employee { get; set; } = null!;
        public virtual ICollection<UserAccountsStatusHistory> UserAccountsStatusHistories { get; set; }
    }
}
