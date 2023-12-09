namespace CarpentryWorkshopAPI.Models
{
    public partial class DegreesStatusHistory
    {
        public int HistoryId { get; set; }
        public int? DegreeId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Degree? Degree { get; set; }
    }
}
