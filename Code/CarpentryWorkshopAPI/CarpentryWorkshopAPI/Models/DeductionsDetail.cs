﻿using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class DeductionsDetail
    {
        public int DeductionDetailId { get; set; }
        public double? Percentage { get; set; }
        public int? DeductionTypeId { get; set; }
        public int? EmployeeId { get; set; }

        public virtual DeductionsType? DeductionType { get; set; }
        public virtual Employee? Employee { get; set; }
    }
}
