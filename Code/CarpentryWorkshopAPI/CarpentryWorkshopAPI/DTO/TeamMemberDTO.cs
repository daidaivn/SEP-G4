namespace CarpentryWorkshopAPI.DTO
{
    public class TeamMemberDTO
    {
        public int EmployeeId { get; set; }
        public string? FullName { get; set; }
        public List<string>? RoleName { get; set; }
    }
}
