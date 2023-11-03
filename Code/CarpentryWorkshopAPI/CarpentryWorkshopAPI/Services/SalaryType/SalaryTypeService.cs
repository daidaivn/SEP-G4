using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalaryType;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace CarpentryWorkshopAPI.Services.SalaryType
{
    public class SalaryTypeService : ISalaryTypeService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public SalaryTypeService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public dynamic GetAllSalaryType()
        {     
            var types = _context.SalaryTypes
                .ToList();
            var dto = _mapper.Map<List<SalaryTypeDTO>>(types);
            return dto;      
        }

        public dynamic AddType(SalaryTypeDTO salaryType)
        {
            var dto = _mapper.Map<Models.SalaryType>(salaryType);
            _context.SalaryTypes.Add(dto);
            _context.SaveChanges();
            return dto;
        }

        public dynamic SearchSalaryTypes(string input)
        {
            var query = _context.SalaryTypes.ToList().AsQueryable();
            string result = input.ToLower().Normalize(NormalizationForm.FormD);
            query = query.Where(x => x.Name.ToLower().Normalize(NormalizationForm.FormD).Contains(result));
            var types = query.Select(t => new SalaryTypeDTO
            {
                SalaryTypeId = t.SalaryTypeId,
                Name= t.Name,
            });
            return types;
        }
    }
}
