namespace CarpentryWorkshopAPI.DTO
{
    public class ContractDTO
    {
        public int ContractId { get; set; }
        public string? EmployeeName { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }
        public string? LinkDoc { get; set; }
        public bool? Status { get; set; }
        public string? ContractTypeName { get; set; }
        public int? ContractTypeId { get; set; }
        public string? ContractCode { get; set; }
        public string? Image { get; set; }
    }
}
