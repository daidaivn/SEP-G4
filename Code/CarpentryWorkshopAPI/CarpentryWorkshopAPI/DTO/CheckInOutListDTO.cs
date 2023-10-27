namespace CarpentryWorkshopAPI.DTO
{
    public class CheckInOutListDTO
    {
        public int CheckInOutId { get; set; }
        public int? EmployeeId { get; set; }
        public string? EmployeeName { get; set; }
        public int? Status { get; set; } = 1;
        public int? Action { get; set; } = 1;
    }
}
