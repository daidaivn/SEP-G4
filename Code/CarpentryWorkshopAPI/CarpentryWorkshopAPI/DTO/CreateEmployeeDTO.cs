using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class CreateEmployeeDTO
    {
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? Dob { get; set; }
        public bool? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Cic { get; set; }
        public int? CountryId { get; set; }
        public int? DepartmentId { get; set; }
        public bool? Status { get; set; }
        //public DateTime? StartDate { get; set; }
        //public DateTime? EndDate { get; set;}
        //public int? RoleID { get; set; }
        //public int? RoleEmployeeEmployeeID { get; set; }


    }
}
