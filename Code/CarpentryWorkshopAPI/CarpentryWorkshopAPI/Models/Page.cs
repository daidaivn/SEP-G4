namespace CarpentryWorkshopAPI.Models
{
    public partial class Page
    {
        public Page()
        {
            PageStatusHistories = new HashSet<PageStatusHistory>();
            Roles = new HashSet<Role>();
        }

        public int PageId { get; set; }
        public string? PageName { get; set; }
        public bool? Status { get; set; }
        public string? PageNameVn { get; set; }

        public virtual ICollection<PageStatusHistory> PageStatusHistories { get; set; }

        public virtual ICollection<Role> Roles { get; set; }
    }
}
