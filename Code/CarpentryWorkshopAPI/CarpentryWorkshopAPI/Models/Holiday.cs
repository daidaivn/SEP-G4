namespace CarpentryWorkshopAPI.Models
{
    public partial class Holiday
    {
        public Holiday()
        {
            HolidaysDetails = new HashSet<HolidaysDetail>();
        }

        public int HolidayId { get; set; }
        public string? HolidayName { get; set; }

        public virtual ICollection<HolidaysDetail> HolidaysDetails { get; set; }
    }
}
