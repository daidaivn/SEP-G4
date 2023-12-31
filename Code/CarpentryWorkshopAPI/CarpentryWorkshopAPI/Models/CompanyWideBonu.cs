﻿using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class CompanyWideBonu
    {
        public int CompanyBonusId { get; set; }
        public decimal? BonusAmount { get; set; }
        public string? BonusName { get; set; }
        public DateTime? BonusDate { get; set; }
        public string? BonusReason { get; set; }
    }
}
