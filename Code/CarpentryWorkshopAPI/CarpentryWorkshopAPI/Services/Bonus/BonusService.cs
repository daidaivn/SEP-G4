using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IBonus;
using CarpentryWorkshopAPI.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

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

            if (personalRewardDTO.BonusId <= 0)
            {
                var newPR = _mapper.Map<BonusDetail>(personalRewardDTO);
                newPR.BonusDate = DateTime.Now.Date;
                _context.BonusDetails.Add(newPR);
                _context.SaveChanges();
                return "Thêm thưởng cá nhân thành công";
            }
            else
            {
                var newPR = _context.BonusDetails.Where(bd=>bd.BonusId == personalRewardDTO.BonusId).FirstOrDefault();
                if(newPR == null) 
                {
                    return "không có thông tin";
                }
                newPR.BonusDate = !string.IsNullOrEmpty(personalRewardDTO.BonusDatestring) &&
                DateTime.TryParseExact(personalRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                       System.Globalization.CultureInfo.InvariantCulture,
                                       System.Globalization.DateTimeStyles.None, out var parsedDate)
                ? parsedDate
                : newPR.BonusDate;
                newPR.BonusReason = personalRewardDTO.BonusReason;
                newPR.BonusName = personalRewardDTO.BonusName;
                newPR.BonusAmount = personalRewardDTO.BonusAmount;
                newPR.EmployeeId = personalRewardDTO.EmployeeId;
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
                var UpdateCR = _context.CompanyWideBonus.Where(re=>re.CompanyBonusId== companyRewardDTO.CompanyBonusId).FirstOrDefault();
                if (UpdateCR == null)
                {
                    return "không có thông tin";
                }
                UpdateCR.BonusName = companyRewardDTO.BonusName;
                UpdateCR.BonusReason = companyRewardDTO.BonusReason;
                UpdateCR.BonusAmount= companyRewardDTO.BonusAmount;
                UpdateCR.BonusDate = !string.IsNullOrEmpty(companyRewardDTO.BonusDatestring) &&
                                   DateTime.TryParseExact(companyRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture,
                                   System.Globalization.DateTimeStyles.None, out var parsedDate) 
                ? parsedDate
                : UpdateCR.BonusDate;



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
                var newPR = _context.SpecialOccasions.FirstOrDefault(sp=>sp.OccasionId == specialOccasionDTO.OccasionId);
                if (newPR == null)
                {
                    return "không có thông tin";
                }
                newPR.OccasionDate = !string.IsNullOrEmpty(specialOccasionDTO.OccasionDateString) &&
                                   DateTime.TryParseExact(specialOccasionDTO.OccasionDateString, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture,
                                   System.Globalization.DateTimeStyles.None, out var parsedDate)
                ? parsedDate
                : newPR.OccasionDate;
                newPR.OccasionNote = specialOccasionDTO.OccasionNote;
                newPR.OccasionType = specialOccasionDTO.OccasionType;
                newPR.EmployeeId = specialOccasionDTO.EmployeeId;
                newPR.Amount= specialOccasionDTO.Amount;
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
                        BonusReason = ps.OccasionNote,
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
                        BonusDatestring = item.BonusDate.Value.ToString("dd'-'MM'-'yyyy"),
                        BonusReason= item.BonusReason,
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
