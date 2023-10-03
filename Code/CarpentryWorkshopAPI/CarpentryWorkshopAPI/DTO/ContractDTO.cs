namespace CarpentryWorkshopAPI.DTO
{
    public class ContractDTO
    {
        public int ContractId { get; set; }
        public string? EmployeeName { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? LinkDoc { get; set; }
    }
}
