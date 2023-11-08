﻿using CarpentryWorkshopAPI.Models;
using Org.BouncyCastle.Asn1.Mozilla;

namespace CarpentryWorkshopAPI.DTO
{
    public class TeamForScheduleDTO
    {
        public int TeamId { get; set; }
        public string? TeamName { get; set; }
        public int? NumberOfMember { get; set; }
        public string? WorkStatus { get; set; }
        public string? TeamLeaderName { get; set; }
        public string? ShiftTypeName { get; set; }
    }
}
