namespace CarpentryWorkshopAPI.Models
{
    public partial class BonusDetail
    {
        public int BonusId { get; set; }
        public int? EmployeeId { get; set; }
        public decimal? BonusAmount { get; set; }
        public string? BonusName { get; set; }
        public DateTime? BonusDate { get; set; }
        public string? BonusReason { get; set; }

        public virtual Employee? Employee { get; set; }
    }
}
