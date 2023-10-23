namespace CarpentryWorkshopAPI.DTO
{
    public class CheckInOutDTO
    {
        public TimeSpan? CheckIn { get; set; }
        public TimeSpan? CheckOut { get; set; }
        public string DateForCheckString { get; set;}
        public int employeeId { get; set;}
    }
}
