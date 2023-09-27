using System;
using System.Collections.Generic;

namespace CarpentryWorkshopAPI.Models
{
    public partial class Degree
    {
        public int DegreeId { get; set; }
        public string? DegreeName { get; set; }
        public string? School { get; set; }
        public string? Major { get; set; }
    }
}
