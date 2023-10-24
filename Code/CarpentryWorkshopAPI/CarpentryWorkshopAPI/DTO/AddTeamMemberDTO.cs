namespace CarpentryWorkshopAPI.DTO
{
    public class AddTeamMemberDTO
    {
        public int TeamId { get; set; }
        public List<int> MemberIds { get; set; }
    }
}
