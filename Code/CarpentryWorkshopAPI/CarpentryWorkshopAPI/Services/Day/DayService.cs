using CarpentryWorkshopAPI.IServices.IDay;
using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.Services.Day
{
    public class DayService : IDayService
    {
        public int CalculateNumberOfHolidays(IEnumerable<HolidaysDetail> holidayGroup)
        {
            var orderedDates = holidayGroup.OrderBy(x => x.Date).Select(x => x.Date.Value).ToList();

            int numberOfDays = 0;

            for (int i = 0; i < orderedDates.Count - 1; i++)
            {
                int daysBetween = (int)(orderedDates[i + 1] - orderedDates[i]).TotalDays;
                numberOfDays += daysBetween;
            }

            numberOfDays += 1;

            return numberOfDays;
        }
    }
}
