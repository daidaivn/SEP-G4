namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface ISalaryService
    {
        dynamic GetAllSalarys(int month, int year);
        dynamic GetEmployeeSalaryDetail(int employeeid, int month, int year);
        dynamic GetEmployeeAllowanceDetail(int employeeid, int month, int year);
        dynamic GetEmployeeMainSalaryDetail(int employeeid, int month, int year);
        dynamic GetEmployeeDeductionDetail(int employeeid, int month, int year);
        dynamic GetEmployeeActualSalaryDetail(int employeeid, int month, int year);
    }
}
