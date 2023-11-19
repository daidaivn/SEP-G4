using CarpentryWorkshopAPI.Models;

public class EmployeeData
{
    public int EmployeeId { get; set; }
    public string FullName { get; set; }
    public bool Gender { get; set; }
    public string Role { get; set; }
    public IEnumerable<HoursWorkDay> WorkDays { get; set; }
    public decimal TotalHours { get; set; }
}
