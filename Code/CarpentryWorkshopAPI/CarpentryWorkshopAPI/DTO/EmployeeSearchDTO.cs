namespace CarpentryWorkshopAPI.DTO
{
    public class EmployeeSearchDTO
    {
       
        public string? InputText { get; set; }
        public bool? Gender { get; set; }
        public bool? Status { get; set; }
        public List<int>? RoleID { get; set; }
    }
}
