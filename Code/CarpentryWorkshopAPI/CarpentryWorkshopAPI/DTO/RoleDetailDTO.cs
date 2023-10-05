using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class RoleDetailDTO
    {
        public int RoleID { get; set; }
        public string? RoleName { get; set; }
        public bool? Status { get; set; }
        public List<string> Employees { get; set; }
    }
}
