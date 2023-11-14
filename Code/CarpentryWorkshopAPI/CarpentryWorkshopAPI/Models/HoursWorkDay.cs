using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HoursWorkDay
    {
        public int HourWorkDayId { get; set; }
        public double? Hour { get; set; }
        public DateTime? Day { get; set; }
        public decimal? HourlyRate { get; set; }
        public int? EmployeeId { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
