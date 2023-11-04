using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.ISalaryType
{
    public interface ISalaryTypeService
    {
        dynamic GetAllSalaryType();
        dynamic SearchSalaryTypes(string input);
        dynamic AddType(SalaryTypeDTO salaryType);
        dynamic UpdateType(SalaryTypeDTO salaryType);
    }
}
