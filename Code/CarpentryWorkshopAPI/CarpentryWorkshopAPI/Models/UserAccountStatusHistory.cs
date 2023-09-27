using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class UserAccountStatusHistory
    {
        public int HistoryId { get; set; }
        public int? AccountId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }

        public virtual UserAccount? Account { get; set; }
    }
}
