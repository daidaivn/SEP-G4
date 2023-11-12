using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeListDTO
    {
        public int? EmployeeID { get; set; }
        public string? EmployeeIdstring { get; set; }
        public string? Image { get; set; }
        public string? FullName { get; set; }
        public string? Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Roles { get; set; }
        public bool? Status { get; set; }
    }

}
