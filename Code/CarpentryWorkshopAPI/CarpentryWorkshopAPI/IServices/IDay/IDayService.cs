using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.IServices.IDay
{
    public interface IDayService
    {
        int CalculateNumberOfHolidays(IEnumerable<HolidaysDetail> holidayGroup);
    }
}
