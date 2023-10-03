namespace CarpentryWorkshopAPI.DTO
{
    public class CreateContractDTO
    {
        public int ContractId { get; set; }
        public int? EmployeeId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string? LinkDoc { get; set; }
    }
}
