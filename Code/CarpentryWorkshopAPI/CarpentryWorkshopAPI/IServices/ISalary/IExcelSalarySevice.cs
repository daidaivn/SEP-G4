using CarpentryWorkshopAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface IExcelSalarySevice
    {
        Task<IEnumerable<EmployeeInfo>> GetEmployeesByContractDateAsync(int month, int year);

        Task<MemoryStream> GenerateExcelAsync(int month, int year);
    }
}
