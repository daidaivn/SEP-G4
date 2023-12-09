namespace CarpentryWorkshopAPI.Models
{
    public partial class SubsidyAmount
    {
        public SubsidyAmount()
        {
            Subsidies = new HashSet<Subsidy>();
        }

        public int SubsidyAmountId { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? Date { get; set; }

        public virtual ICollection<Subsidy> Subsidies { get; set; }
    }
}
