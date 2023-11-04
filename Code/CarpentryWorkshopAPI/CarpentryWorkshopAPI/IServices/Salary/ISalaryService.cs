using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.Salary
{
    public interface ISalaryService
    {
        dynamic GetAllSalary();
        dynamic SearchSalary(string input);
        dynamic AddSalary(CreateSalaryDTO salaryDTO);
        dynamic UpdateSalary(CreateSalaryDTO salaryDTO);
    }
}
