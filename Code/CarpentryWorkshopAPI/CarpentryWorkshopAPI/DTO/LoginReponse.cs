using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.DTO
{
    public class LoginReponse
    {
        List<RoleDTO> roleDTOs { get; set; }
        string token { get; set; }  
    }
}
