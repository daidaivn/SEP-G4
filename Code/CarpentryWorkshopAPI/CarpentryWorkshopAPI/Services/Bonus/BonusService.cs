using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IBonus;
using CarpentryWorkshopAPI.Models;
using Microsoft.DotNet.Scaffolding.Shared.ProjectModel;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CarpentryWorkshopAPI.Services.Bonus
{
    public class BonusService : IBonusService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public BonusService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public dynamic CreateAndUpdatePersonalReward(PersonalRewardDTO personalRewardDTO)
        {

            if (personalRewardDTO.BonusId == 0)
            {
                var newPR = _mapper.Map<BonusDetail>(personalRewardDTO);
                newPR.BonusDate = DateTime.Now.Date;
                _context.BonusDetails.Add(newPR);
                _context.SaveChanges();
                return " Add personal reward successful";
            }
            else
            {                
                var newPR = _mapper.Map<BonusDetail>(personalRewardDTO);
                newPR.BonusDate = !string.IsNullOrEmpty(personalRewardDTO.BonusDatestring) &&
                DateTime.TryParseExact(personalRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out var parsedDate)
                ? parsedDate
                : newPR.BonusDate;
                _context.BonusDetails.Update(newPR);
                _context.SaveChanges();
                return " Update personal reward successful";
            }
        }
        public dynamic CreateAndUpdateCompanyRerward(CompanyRewardDTO companyRewardDTO)
        {
            var allemployees = _context.Employees
                .Include(x => x.RolesEmployees)
                .Where(x => x.RolesEmployees.Any(re => re.EndDate == null))
                .ToList();
            if (companyRewardDTO.CompanyBonusId == 0)
            {
                foreach (var item in allemployees)
                {
                    CompanyWideBonu newCR = new CompanyWideBonu()
                    {
                        EmployeeId = item.EmployeeId,
                        BonusAmount = companyRewardDTO.BonusAmount,
                        BonusName = companyRewardDTO.BonusName,
                        BonusDate = DateTime.Now.Date,
                        BonusReason = companyRewardDTO.BonusReason,
                    };
                    _context.CompanyWideBonus.Add(newCR);
                    _context.SaveChanges();
                }
                return " Add company reward successful";
            }
            else
            {
                foreach (var item in allemployees)
                {
                    CompanyWideBonu newCR = new CompanyWideBonu()
                    {
                        CompanyBonusId = companyRewardDTO.CompanyBonusId,
                        EmployeeId = item.EmployeeId,
                        BonusAmount = companyRewardDTO.BonusAmount,
                        BonusName = companyRewardDTO.BonusName,
                        BonusReason = companyRewardDTO.BonusReason,
                    };
                    if( !string.IsNullOrEmpty(companyRewardDTO.BonusDatestring) &&
                                       DateTime.TryParseExact(companyRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out var parsedDate))
                    {
                        newCR.BonusDate = parsedDate;
                    }
                                       
                    _context.CompanyWideBonus.Update(newCR);
                    _context.SaveChanges();
                }
                return " Update company reward successful";
            }
        }
        public dynamic CreateAndUpdateSpecialOccasion(SpecialOccasionDTO specialOccasionDTO)
        {
            
            if (specialOccasionDTO.OccasionId == 0)
            {
                var newPR = _mapper.Map<Models.SpecialOccasion>(specialOccasionDTO);
                newPR.OccasionDate = DateTime.Now.Date;
                _context.SpecialOccasions.Add(newPR);
                _context.SaveChanges();
                return " Add SpecialOccasions";
            }
            else
            {                
                var newPR = _mapper.Map<Models.SpecialOccasion>(specialOccasionDTO);
                if (DateTime.TryParseExact(specialOccasionDTO.OccasionDateString, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out DateTime parsedDate))
                {
                    newPR.OccasionDate = parsedDate;
                }
                newPR.OccasionDate = parsedDate;
                _context.SpecialOccasions.Update(newPR);
                _context.SaveChanges();
                return " SpecialOccasions";
            }
        }
        public dynamic GetAllReward(string date)
        {
            AllRewardDTO listreward = new AllRewardDTO();
            if (DateTime.TryParseExact(date, "MM-yyyy", CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsedDate))
            {
                var startDateOfMonth = new DateTime(parsedDate.Year, parsedDate.Month, 1);
                var endDateOfMonth = startDateOfMonth.AddMonths(1).AddDays(-1);
                var person = _context.BonusDetails
                    .Include(x => x.Employee)
                    .Where(sd => sd.BonusDate >= startDateOfMonth && sd.BonusDate <= endDateOfMonth)
                    .ToList();
                var personSpecial = _context.SpecialOccasions
                    .Include(sp => sp.Employee)
                    .Where(sd => sd.OccasionDate >= startDateOfMonth && sd.OccasionDate <= endDateOfMonth)
                    .Select(ps => new AllRewardDTO.SPE
                    {
                        OccasionId = ps.OccasionId,
                        EmployeeId = ps.EmployeeId,
                        Beneficiary =ps.Employee.LastName +" "+ps.Employee.FirstName,
                        OccasionType = ps.OccasionType,
                        Amount = ps.Amount,
                        OccasionDateString = ps.OccasionDate.Value.ToString("dd'-'MM'-'yyyy"),
                    }).ToList();
                var persondto = _mapper.Map<List<DTO.AllRewardDTO.PR>>(person);
                var company = _context.CompanyWideBonus
                    .Include(x => x.Employee)
                    .Where(sd => sd.BonusDate >= startDateOfMonth && sd.BonusDate <= endDateOfMonth)
                    .GroupBy(sd => sd.BonusName)
                    .Select(group => group.First())
                    .ToList();
                
                List<DTO.AllRewardDTO.CWR> companydto = new List<AllRewardDTO.CWR>();
                foreach (var item in company)
                {
                    DTO.AllRewardDTO.CWR cwrs = new AllRewardDTO.CWR()
                    {
                        CompanyBonusId = item.CompanyBonusId,
                        Beneficiary = "Toàn thể công ty",
                        BonusAmount = item.BonusAmount,
                        BonusName = item.BonusName,
                        BonusDatestring = item.BonusDate.Value.ToString("dd'-'MM'-'yyyy")
                    };

                    companydto.Add(cwrs);
                }
                listreward.PersonalRewardList = persondto;
                listreward.CompanyRewardList = companydto;
                listreward.SpecialOcationList = personSpecial;
            }
            return listreward;
        }
    }
}
