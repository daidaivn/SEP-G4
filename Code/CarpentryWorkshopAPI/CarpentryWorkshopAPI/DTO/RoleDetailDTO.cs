using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class RoleDetailDTO
    {
        public int RoleID { get; set; }
        public string? RoleName { get; set; }
        public bool? Status { get; set; }
        public List<EmployeeRole> Employees { get; set; }
        public int? NumberOfEmployee { get; set; }
        public class EmployeeRole
        {
            public int? EmployeeId { get; set;}
            public string EmployeeName { get; set; }
        }
    }
}
