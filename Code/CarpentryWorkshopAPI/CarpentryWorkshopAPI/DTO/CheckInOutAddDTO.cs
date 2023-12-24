namespace CarpentryWorkshopAPI.DTO
{
    public class CheckInOutAddDTO
    {
        public int? Id { get; set; }
        public int? employeeId { get; set; }
        public string? CheckIn { get; set; }
        public string? CheckOut { get; set; }
        public String? Datestring { get; set; }
    }
}
