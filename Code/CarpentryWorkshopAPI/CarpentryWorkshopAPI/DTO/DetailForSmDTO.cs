﻿using System.Drawing.Printing;

namespace CarpentryWorkshopAPI.DTO
{
    public class DetailForSmDTO
    {
        public int? TeamWorkId { get; set; }
        public int? TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? WorkId { get; set; }
        public string? WorkName { get; set;}
        public int? NumberOfProduct { get; set; }
        public int? NumberOFProductToday { get; set; }
        public string? Date { get; set; }
    }
}
