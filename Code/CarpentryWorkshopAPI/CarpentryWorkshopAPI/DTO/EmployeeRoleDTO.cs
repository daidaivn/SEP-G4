using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeRoleDTO
    {
        public int RoleID { get; set; }
        public string? RoleName { get; set; }
        public List<EmployeeRoles> Employees { get; set; }
        public class EmployeeRoles
        {
            public int? EmployeeId { get; set; }
            public string? EmployeeIdstring { get; set; }
            public string? EmployeeName { get; set; }
            public int? DepartmentId { get; set; }
            public string? DepartmentName { get; set; }
        }
    }
}
