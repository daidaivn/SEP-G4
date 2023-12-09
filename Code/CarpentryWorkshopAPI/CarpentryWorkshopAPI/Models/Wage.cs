namespace CarpentryWorkshopAPI.Models
{
    public partial class Wage
    {
        public Wage()
        {
            Employees = new HashSet<Employee>();
            WageStatusHistories = new HashSet<WageStatusHistory>();
        }

        public int WageId { get; set; }
        public double? WageNumber { get; set; }
        public string? Relation { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
        public virtual ICollection<WageStatusHistory> WageStatusHistories { get; set; }
    }
}
