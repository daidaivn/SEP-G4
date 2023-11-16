namespace CarpentryWorkshopAPI.DTO
{
    public class CompanyRewardDTO
    {
        public int CompanyBonusId { get; set; }
        public decimal? BonusAmount { get; set; }
        public string? BonusName { get; set; }
        public string? BonusDatestring { get; set; }
        public string? BonusReason { get; set; }
    }
}
