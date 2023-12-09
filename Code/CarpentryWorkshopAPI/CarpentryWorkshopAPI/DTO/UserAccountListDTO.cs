namespace CarpentryWorkshopAPI.DTO
{
    public class UserAccountListDTO
    {
        public int EmployeeId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public bool? Status { get; set; }
        public string? EmployeeName { get; set; }
        public List<string> PageName { get; set; }
    }
}
