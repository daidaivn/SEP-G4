namespace CarpentryWorkshopAPI.Models
{
    public partial class DepartmentsStatusHistory
    {
        public int HistoryId { get; set; }
        public int? DepartmentId { get; set; }
        public string? Action { get; set; }
        public DateTime? ActionDate { get; set; }
        public int? CurrentEmployeeId { get; set; }

        public virtual Department? Department { get; set; }
    }
}
