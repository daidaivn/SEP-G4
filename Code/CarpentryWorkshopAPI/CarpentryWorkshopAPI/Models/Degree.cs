namespace CarpentryWorkshopAPI.Models
{
    public partial class Degree
    {
        public Degree()
        {
            DegreesStatusHistories = new HashSet<DegreesStatusHistory>();
            EmployeeDegrees = new HashSet<EmployeeDegree>();
        }

        public int DegreeId { get; set; }
        public string? DegreeName { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<DegreesStatusHistory> DegreesStatusHistories { get; set; }
        public virtual ICollection<EmployeeDegree> EmployeeDegrees { get; set; }
    }
}
