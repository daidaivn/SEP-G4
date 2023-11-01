using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HoursWorkDay
    {
        public int HourWorkDayId { get; set; }
        public double? Hour { get; set; }
        public DateTime? Day { get; set; }
        public int? EmployeeId { get; set; }
    }
}
