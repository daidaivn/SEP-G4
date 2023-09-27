using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class UserAccount
    {
        public UserAccount()
        {
            UserAccountStatusHistories = new HashSet<UserAccountStatusHistory>();
        }

        public int AccountId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int? EmployeeId { get; set; }
        public bool? Status { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual ICollection<UserAccountStatusHistory> UserAccountStatusHistories { get; set; }
    }
}
