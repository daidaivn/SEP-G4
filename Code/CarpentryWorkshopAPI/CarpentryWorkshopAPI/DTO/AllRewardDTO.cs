namespace CarpentryWorkshopAPI.DTO
{
    public class AllRewardDTO
    {
        public int SalaryDetailId { get; set; }
        public double? Amount { get; set; }
        public string? StartDatestring { get; set; }
        public string? EndDatestring { get; set; }
        public int? SalaryTypeId { get; set; }
        public string? SalaryTypeName { get; set; }
        public int? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
    }
}
