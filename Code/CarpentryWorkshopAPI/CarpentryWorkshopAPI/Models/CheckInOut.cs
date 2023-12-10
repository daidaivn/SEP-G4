using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class CheckInOut
    {
        public CheckInOut()
        {
            HistoryChangeCheckInOuts = new HashSet<HistoryChangeCheckInOut>();
        }

        public int CheckInOutId { get; set; }
        public int? EmployeeId { get; set; }
        public TimeSpan? TimeCheckIn { get; set; }
        public TimeSpan? TimeCheckOut { get; set; }
        public string? Note { get; set; }
        public DateTime? Date { get; set; }

        public virtual Employee? Employee { get; set; }
        public virtual ICollection<HistoryChangeCheckInOut> HistoryChangeCheckInOuts { get; set; }
    }
}
