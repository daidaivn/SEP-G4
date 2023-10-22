using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class CreateAccount
    {
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public int employeeId { get; set; }
    }
}
