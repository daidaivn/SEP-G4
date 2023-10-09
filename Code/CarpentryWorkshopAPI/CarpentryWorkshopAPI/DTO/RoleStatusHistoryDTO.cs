﻿namespace CarpentryWorkshopAPI.DTO
{
    public class RoleStatusHistoryDTO
    {
        public int HistoryId { get; set; }
        public string? RoleName { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }
    }
}
