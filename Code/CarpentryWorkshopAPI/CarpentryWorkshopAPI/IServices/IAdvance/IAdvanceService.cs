using CarpentryWorkshopAPI.DTO;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.IServices.IAdvance
{
    public interface IAdvanceService
    {

        Task<dynamic> GetAllAdvanceSalary([FromBody] SearchAdvanceDTO searchAdvanceDTO);
        Task<dynamic> GetAdvanceDetail(int advanceSalaryId);
        Task<dynamic> GetEmployee(string employeeidstring);
        Task<dynamic> CreateAdvance([FromBody] CreateAdvanceDTO createAdvanceDTO);
        Task<dynamic> UpdateAdvance([FromBody] CreateAdvanceDTO createAdvanceDTO);
    }
}
