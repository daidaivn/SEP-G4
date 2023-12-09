namespace CarpentryWorkshopAPI.Models
{
    public partial class RelationshipsType
    {
        public RelationshipsType()
        {
            Dependents = new HashSet<Dependent>();
        }

        public int RelationshipId { get; set; }
        public string? RelationshipName { get; set; }
        public string? Note { get; set; }

        public virtual ICollection<Dependent> Dependents { get; set; }
    }
}
