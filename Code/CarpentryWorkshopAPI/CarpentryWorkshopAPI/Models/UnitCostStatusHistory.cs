namespace CarpentryWorkshopAPI.Models
{
    public partial class UnitCostStatusHistory
    {
        public int HistoryId { get; set; }
        public int? UniCostId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public string? CurrentEmployeeId { get; set; }

        public virtual UnitCost? UniCost { get; set; }
    }
}
