﻿using CarpentryWorkshopAPI.DTO;

namespace CarpentryWorkshopAPI.IServices.ISalary
{
    public interface IExcelSalarySevice
    {
        Task<IEnumerable<EmployeeInfo>> GetEmployeesByContractDateAsync(int month, int year);

        Task<MemoryStream> GenerateExcelAsync(int month, int year);
        Task<EmployeeInfo> GetEmployeesByContractDateAsyncById(int month, int year, int employeeId);
    }
}
