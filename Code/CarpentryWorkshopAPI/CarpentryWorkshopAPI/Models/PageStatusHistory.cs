using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class PageStatusHistory
    {
        public int HistoryId { get; set; }
        public int? PageId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public string? Note { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Page? Page { get; set; }
    }
}
