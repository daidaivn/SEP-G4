using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IBonus;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CarpentryWorkshopAPI.Services.Bonus
{
    public class BonusService : IBonusService
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public BonusService(SEPG4CWMSContext context, IMapper mapper)
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
                return "Thêm thưởng cá nhân thành công";
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
                return "Chỉnh sửa thưởng cá nhân thành công";
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

                CompanyWideBonu newCR = new CompanyWideBonu()
                {
                    BonusAmount = companyRewardDTO.BonusAmount,
                    BonusName = companyRewardDTO.BonusName,
                    BonusDate = DateTime.Now.Date,
                    BonusReason = companyRewardDTO.BonusReason,
                };
                _context.CompanyWideBonus.Add(newCR);
                _context.SaveChanges();

                return "Thêm thưởng công ty thành công";
            }
            else
            {

                CompanyWideBonu newCR = new CompanyWideBonu()
                {
                    CompanyBonusId = companyRewardDTO.CompanyBonusId,
                    BonusAmount = companyRewardDTO.BonusAmount,
                    BonusName = companyRewardDTO.BonusName,
                    BonusReason = companyRewardDTO.BonusReason,
                };
                if (!string.IsNullOrEmpty(companyRewardDTO.BonusDatestring) &&
                                   DateTime.TryParseExact(companyRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture,
                                   System.Globalization.DateTimeStyles.None, out var parsedDate))
                {
                    newCR.BonusDate = parsedDate;
                }

                _context.CompanyWideBonus.Update(newCR);
                _context.SaveChanges();

                return "Chỉnh sửa thưởng công ty thành công";
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
                return "Tạo hiếu hỉ thành công";
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
                return "Chỉnh sửa hiếu hỉ thành công";
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
                        Beneficiary = ps.Employee.LastName + " " + ps.Employee.FirstName,
                        OccasionType = ps.OccasionType,
                        Amount = ps.Amount,
                        OccasionDateString = ps.OccasionDate.Value.ToString("dd'-'MM'-'yyyy"),
                    }).ToList();
                var persondto = _mapper.Map<List<DTO.AllRewardDTO.PR>>(person);
                var company = _context.CompanyWideBonus
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

        public dynamic GetPersonalReward(int id)
        {
            if(id < 0)
            {
                return "not valid id";
            }
            var person = _context.BonusDetails
                   .Include(x => x.Employee)
                   .Where(sd => sd.BonusId == id)
                   .ToList();
            var persondto = _mapper.Map<List<DTO.AllRewardDTO.PR>>(person);
            return persondto;
        }

        public dynamic GetCompanyReward(int id)
        {
            if (id < 0)
            {
                return "not valid id";
            }
            var company = _context.CompanyWideBonus
                     .Where(sd => sd.CompanyBonusId == id)
                     .GroupBy(sd => sd.BonusName)
                     .Select(group => group.First())
                     .ToList();

            
            return company;
        }

        public dynamic GetSpecialOccasionReward(int id)
        {
            if (id < 0)
            {
                return "not valid id";
            }
            var personSpecial = _context.SpecialOccasions
                    .Include(sp => sp.Employee)
                    .Where(sd => sd.OccasionId == id)
                    .Select(ps => new AllRewardDTO.SPE
                    {
                        OccasionId = ps.OccasionId,
                        EmployeeId = ps.EmployeeId,
                        Beneficiary = ps.Employee.LastName + " " + ps.Employee.FirstName,
                        OccasionType = ps.OccasionType,
                        Amount = ps.Amount,
                        OccasionDateString = ps.OccasionDate.Value.ToString("dd'-'MM'-'yyyy"),
                    }).ToList();
            return personSpecial;
        }
    }
}
