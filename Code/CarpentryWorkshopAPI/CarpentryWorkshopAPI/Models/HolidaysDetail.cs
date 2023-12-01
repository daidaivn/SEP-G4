using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HolidaysDetail
    {
        public int HolidayDetailId { get; set; }
        public int? HolidayId { get; set; }
        public DateTime? Date { get; set; }

        public virtual Holiday? Holiday { get; set; }
    }
}
