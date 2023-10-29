namespace CarpentryWorkshopAPI.DTO
{
    public class WageDTO
    {
        public int WageId { get; set; }
        public double? WageNumber { get; set; }
        public string? Relation { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
        public bool? Status { get; set; }
    }
}
