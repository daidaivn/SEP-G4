namespace CarpentryWorkshopAPI.DTO
{
    public class CreateContractDTO
    {
        public int ContractId { get; set; }
        public int? EmployeeId { get; set; }
        public string? StartDatestring { get; set; }
        public string? LinkDoc { get; set; }
        public bool? Status { get; set; }
        public int? ContractTypeID { get; set; }
        public string? ContractCode { get; set; }
        public string? Image { get; set; }
        public decimal? Amount { get; set; }
        public bool? IsOffice { get; set; }
    }
}
