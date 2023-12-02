using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface IExcelSalarySevice
    {
        Task<MemoryStream> GenerateSalaryExcel(int month, int year);
        Task<IEnumerable<object>> GetEmployeesByContractDateAsync(int month, int year);
    }
}
