namespace CarpentryWorkshopAPI.IServices.Account
{
    public interface IAccountService
    {
        
        dynamic GenerateRandomString(int length);
        dynamic isEmail(string inputEmail);
        dynamic Check_Gmail(string gmail);
    }
}
