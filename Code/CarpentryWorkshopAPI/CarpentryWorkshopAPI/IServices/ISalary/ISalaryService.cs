namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface ISalaryService
    {
        dynamic GetAllSalarys(int month, int year);
    }
}
