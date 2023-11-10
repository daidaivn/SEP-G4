namespace CarpentryWorkshopAPI.DTO
{
    public class WorkDetailDTO
    {
        public string? WorkName { get; set; }
        public int? TotalProduct { get; set; }
        public int? UniCostName { get; set; }
        public int? WorkAreaName { get; set; }
        public List<TeamDetal> teamDetals { get; set; }
        public class TeamDetal
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public int NumberProduct { get; set; }
            public string StartDate { get; set; }
            public string EndDate { get; set; }

        }
    }
}
