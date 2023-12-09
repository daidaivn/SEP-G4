namespace CarpentryWorkshopAPI.Models
{
    public partial class Country
    {
        public Country()
        {
            Employees = new HashSet<Employee>();
        }

        public int CountryId { get; set; }
        public string? CountryCode { get; set; }
        public string? CountryName { get; set; }

        public virtual ICollection<Employee> Employees { get; set; }
    }
}
