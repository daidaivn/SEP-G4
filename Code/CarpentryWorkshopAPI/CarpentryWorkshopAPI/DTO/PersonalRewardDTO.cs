namespace CarpentryWorkshopAPI.DTO
{
    public class PersonalRewardDTO
    {
        public int BonusId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? BonusAmount { get; set; }
        public string? BonusName { get; set; }
        public string? BonusDatestring { get; set; }
        public string? BonusReason { get; set; }

    }
}
