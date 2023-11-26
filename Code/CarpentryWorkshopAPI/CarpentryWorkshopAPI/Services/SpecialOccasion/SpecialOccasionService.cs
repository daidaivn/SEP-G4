using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.SpecialOccasion;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;

namespace CarpentryWorkshopAPI.Services.SpecialOccasion
{
    public class SpecialOccasionService : ISpecialOccasion
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public SpecialOccasionService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public dynamic AddSpecialOccasion(SpecialOccasionDTO specialOccasionDTO)
        {
            try
            {
                var specialOccasion = _mapper.Map<Models.SpecialOccasion>(specialOccasionDTO);
                specialOccasion.OccasionDate = DateTime.ParseExact(specialOccasionDTO.OccasionDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
                _context.SpecialOccasions.Add(specialOccasion);
                _context.SaveChanges();
                return "add success";
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }

        public dynamic GetAllSpecialOccasion()
        {
            var specialOccasion = _context.SpecialOccasions.Include(se=>se.Employee).Select(se => new SpecialOccasionDTO
            {
                OccasionId = se.OccasionId,
                EmployeeId = se.EmployeeId,
                OccasionType = se.OccasionType,
                Amount = se.Amount,
                OccasionDateString = se.OccasionDate.Value.ToString("dd'-'MM'-'yyyy")
            }).ToList();
            return specialOccasion;
        }

        public dynamic SearchSpecialOccasion(string input)
        {
            throw new NotImplementedException();
        }

        public dynamic UpdateSpecialOccasion(SpecialOccasionDTO specialOccasionDTO)
        {
            try
            {
                var specialOccasion = _mapper.Map<Models.SpecialOccasion>(specialOccasionDTO);
                specialOccasion.OccasionDate = DateTime.ParseExact(specialOccasionDTO.OccasionDateString, "dd-MM-yyyy", System.Globalization.CultureInfo.InvariantCulture);
                _context.SpecialOccasions.Update(specialOccasion);
                _context.SaveChanges();
                return "add success";
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }
    }
}
