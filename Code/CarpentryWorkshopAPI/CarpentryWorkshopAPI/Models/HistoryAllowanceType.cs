namespace CarpentryWorkshopAPI.Models
{
    public partial class HistoryAllowanceType
    {
        public int Id { get; set; }
        public decimal? Amount { get; set; }
        public int? AllowanceTypeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public virtual AllowanceType? AllowanceType { get; set; }
    }
}
