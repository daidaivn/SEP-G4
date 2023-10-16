namespace CarpentryWorkshopAPI.DTO
{
    public class UserAccountDTO
    {
        public int EmployeeId { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public bool? Status { get; set; }
    }
}
