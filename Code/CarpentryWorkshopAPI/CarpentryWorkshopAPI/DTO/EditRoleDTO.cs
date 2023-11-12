namespace CarpentryWorkshopAPI.DTO
{
    public class EditRoleDTO
    {
        public int? EmployeeId { get; set; }
        public List<DR>? rds { get; set; }
        public class DR
        {
            public int RoleId { get; set; }
            public int DepartmentId { get; set; }
        } 
    }
}
