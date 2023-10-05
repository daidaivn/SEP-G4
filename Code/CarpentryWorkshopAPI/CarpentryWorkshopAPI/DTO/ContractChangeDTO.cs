namespace CarpentryWorkshopAPI.DTO
{
    public class ContractChangeDTO
    {
        public int ContractId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? Status { get; set; }
    }
}
