namespace CarpentryWorkshopAPI.DTO
{
    public class AllRewardDTO
    {
        public List<PR> PersonalRewardList { get; set; }
        public List<CWR> CompanyRewardList { get; set; }
        public class PR
        {
            public int BonusId { get; set; }
            public int? EmployeeId { get; set; }
            public string? Beneficiary { get; set; }
            public decimal? BonusAmount { get; set; }
            public string? BonusName { get; set; }
            public string? BonusDatestring { get; set; }
        }
        public class CWR
        {
            public int CompanyBonusId { get; set; }
            public string? Beneficiary { get; set; }
            public decimal? BonusAmount { get; set; }
            public string? BonusName { get; set; }
            public string? BonusDatestring { get; set; }
        }
    }
}
