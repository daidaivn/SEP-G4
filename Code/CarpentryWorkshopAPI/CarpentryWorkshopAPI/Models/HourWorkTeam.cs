using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class HourWorkTeam
    {
        public int HourWorkTeamId { get; set; }
        public int? TeamId { get; set; }
        public double? Hour { get; set; }
        public decimal? TotalMoneyOfTeam { get; set; }
        public decimal? AmountMoneyPerHour { get; set; }
        public DateTime? Date { get; set; }

        public virtual Team? Team { get; set; }
    }
}
