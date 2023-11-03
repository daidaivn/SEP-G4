namespace CarpentryWorkshopAPI.IServices.ISalaryType
{
    public interface ISalaryTypeService
    {
        dynamic GetAllSalaryType();
        dynamic SearchSalaryTypes(string input);
    }
}
