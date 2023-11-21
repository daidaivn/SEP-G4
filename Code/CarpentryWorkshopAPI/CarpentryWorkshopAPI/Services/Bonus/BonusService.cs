﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IBonus;
using CarpentryWorkshopAPI.Models;
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
                _context.BonusDetails.Add(newPR);
                _context.SaveChanges();
                return " Add personal reward successful";
            }
            else
            {
                var newPR = _mapper.Map<BonusDetail>(personalRewardDTO);
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
                        BonusDate = DateTime.ParseExact(companyRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture),
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
                        BonusDate = DateTime.ParseExact(companyRewardDTO.BonusDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture),
                        BonusReason = companyRewardDTO.BonusReason,
                    };
                    _context.CompanyWideBonus.Update(newCR);
                    _context.SaveChanges();
                }
                return " Update company reward successful";
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
