namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeSearchDTO
    {
       
        public string? Name { get; set; }
        public bool? Gender { get; set; }
        public string? PhoneNumber { get; set; }
        public bool? Status { get; set; }
        public List<int>? RoleID { get; set; }
    }
}
