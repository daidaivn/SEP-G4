﻿namespace CarpentryWorkshopAPI.DTO
{
    public class RoleStatusHistoryDTO
    {
        public int HistoryId { get; set; }
        public int? RoleId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
    }
}
