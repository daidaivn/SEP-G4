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
                var salary = _context.Salaries.Include(s=>s.Emloyee).ToList();
                var dto = _mapper.Map<SalaryListDTO>(salary);
                return dto;
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
