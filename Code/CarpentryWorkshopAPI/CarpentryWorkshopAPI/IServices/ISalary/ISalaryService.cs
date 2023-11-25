using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface ISalaryService
    {
        Task<dynamic> GetAllSalarys(GetSalarysDTO getSalarysDTO);
        Task<dynamic> GetEmployeeSalaryDetail(int employeeid, int month, int year);
        Task<dynamic> GetEmployeeAllowanceDetail(int employeeid, int month, int year);
        Task<dynamic> GetEmployeeMainSalaryDetail(int employeeid, int month, int year);
        Task<dynamic> GetEmployeeDeductionDetail(int employeeid, int month, int year);
        Task<dynamic> GetEmployeeActualSalaryDetail(int employeeid, int month, int year);
    }
}
