namespace CarpentryWorkshopAPI.Models
{
    public partial class TypeDependent
    {
        public TypeDependent()
        {
            Dependents = new HashSet<Dependent>();
        }

        public int TypeDependentId { get; set; }
        public string? Name { get; set; }
        public string? Note { get; set; }

        public virtual ICollection<Dependent> Dependents { get; set; }
    }
}
