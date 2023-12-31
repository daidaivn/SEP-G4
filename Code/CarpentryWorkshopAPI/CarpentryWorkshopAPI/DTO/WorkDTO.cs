﻿namespace CarpentryWorkshopAPI.DTO
{
    public class WorkDTO
    {
        public int TeamId { get; set; }
        public int WorkId { get; set; }
        public string? WorkName { get; set; }
        public int? TotalProduct { get; set; }
        public int? UniCostId { get; set; }
        public int? WorkAreaId { get; set; }
        public string? StartDateString { get; set; }
        public string? EndDateString { get; set; }
        public double? Cost { get; set; }
        public string? Note { get; set; }
        public int? EmployeeId { get; set; }
        public string? DateString { get; set; }
    }
}
