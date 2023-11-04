using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalaryDetail;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Services.SalaryDetail
{
    public class SalaryDetailService : ISalaryDetailService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public SalaryDetailService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public dynamic GetAllSalaryDetail()
        {
            var details = _context.SalaryDetails
                .Include(x => x.SalaryType)
                .ToList();
            var dto = _mapper.Map<List<SalaryDetailDTO>>(details);
            return dto;
        }
        public dynamic AddSalaryDetail(CreateSalaryDetailDTO createSalaryDetailDTO)
        {
            var newDetail = _mapper.Map<Models.SalaryDetail>(createSalaryDetailDTO);
            _context.SalaryDetails.Add(newDetail);
            _context.SaveChanges();
            return "Create new salary detail successful";
        }
        public dynamic UpdateSalaryDetail(CreateSalaryDetailDTO createSalaryDetailDTO)
        {
            var exDetail = _mapper.Map<Models.SalaryDetail>(createSalaryDetailDTO);
            _context.SalaryDetails.Update(exDetail);
            _context.SaveChanges();
            return "Update salary detail successful";
        }
    }
}
