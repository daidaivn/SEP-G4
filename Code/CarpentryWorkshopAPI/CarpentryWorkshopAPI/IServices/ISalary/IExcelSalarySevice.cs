namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface IExcelSalarySevice
    {
        Task<MemoryStream> GenerateSalaryExcel(int month, int year);
    }
}
