using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class CreateEmployeeDTO
    {
       
        public string? Image { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Dob { get; set; }
        public string? Gender { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Cic { get; set; }
        public int? TaxId { get; set; }
        public string? Email { get; set; }
        public int? CountryId { get; set; }
        public bool? Status { get; set; }
        public string? StartDate { get; set; }
        public string? EndDate { get; set; }    
        public List<string> Roles { get; set; }
        public List<string> Department { get; set; }


    }
}
