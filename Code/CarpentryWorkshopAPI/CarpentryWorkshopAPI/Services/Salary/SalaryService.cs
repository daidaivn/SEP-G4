using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.Salary;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Services.Salary
{
    public class SalaryService : ISalaryService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public SalaryService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public dynamic AddSalary(CreateSalaryDTO salaryDTO)
        {
            try
            {
                var salary = _mapper.Map<Models.Salary>(salaryDTO);
                _context.Add(salary);
                _context.SaveChanges();
                return "add slary success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public dynamic GetAllSalary()
        {
            try
            {
                var salary = _context.Salaries
                    .Select(s => new SalaryListDTO
                    {
                        SalaryId = s.SalaryId,
                        SalaryName = s.SalaryName,
                        SalaryDetailId = s.SalaryDetailId,
                        AmountOfMoney = s.AmountOfMoney,
                        EmloyeeIdInput = s.EmloyeeIdInput,
                        EmployeeName = s.SalarySalaryDetails.Where(ssd=>ssd.EmployeeId == s.EmloyeeIdInput).Select(ssd => ssd.Employee.FirstName + " " + ssd.Employee.LastName).FirstOrDefault(),
                        MonthSalary = s.MonthSalary,
                        Year = s.Year,
                    })
                    .ToList();
                
                
                return salary;
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public dynamic SearchSalary(string input)
        {
            throw new NotImplementedException();
        }

        public dynamic UpdateSalary(CreateSalaryDTO salaryDTO)
        {
            try
            {
                var salary = _mapper.Map<Models.Salary>(salaryDTO);
                _context.Salaries.Update(salary);
                _context.SaveChanges();
                return "add slary success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
