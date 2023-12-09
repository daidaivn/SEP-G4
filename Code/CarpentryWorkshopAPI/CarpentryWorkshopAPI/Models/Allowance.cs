namespace CarpentryWorkshopAPI.Models
{
    public partial class Allowance
    {
        public Allowance()
        {
            AllowanceTypes = new HashSet<AllowanceType>();
        }

        public int AllowanceId { get; set; }
        public string? Name { get; set; }
        public bool? Status { get; set; }

        public virtual ICollection<AllowanceType> AllowanceTypes { get; set; }
    }
}
