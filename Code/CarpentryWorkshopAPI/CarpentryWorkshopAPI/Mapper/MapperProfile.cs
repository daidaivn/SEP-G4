﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {

            CreateMap<CreateEmployeeDTO, Employee>()
               .ForMember(de => de.Dob, option => option.MapFrom(d => DateTime.ParseExact(d.Dobstring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)));

            CreateMap<Employee, EmployeeSearchDTO>()
               .ReverseMap();
            CreateMap<Role, RoleDTO>()
               .ReverseMap();
            //Department
            CreateMap<Department, DepartmentListDTO>()
                .ForMember(de => de.number, option => option.MapFrom(d => d.RolesEmployees.Where(re => re.EndDate == null).Select(re => re.EmployeeId).Distinct().Count()))
                .ReverseMap();
            CreateMap<Department, DepartmentDTO>().ReverseMap();
            //Dependent
            CreateMap<Dependent, DependentDTO>()
                .ReverseMap();
            CreateMap<Dependent, DependentListDTO>()
                .ForMember(de => de.EmployeesName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ForMember(de => de.GenderString, option => option.MapFrom(d => d.Gender == true ? "Nam" : "Nữ"))
                .ForMember(de => de.DobString, option => option.MapFrom(d => d.Dob != null ? d.Dob.Value.ToString("dd'-'MM'-'yyyy") : ""))
                .ForMember(de => de.StartDateString, option => option.MapFrom(d => d.StartDate != null ? d.StartDate.Value.ToString("dd'-'MM'-'yyyy") : ""))
                .ForMember(de => de.RelationshipName, option => option.MapFrom(d => d.Relationship.RelationshipName))
                .ForMember(de => de.EndDateString, option => option.MapFrom(d => d.EndDate != null ? d.EndDate.Value.ToString("dd'-'MM'-'yyyy") : ""));
            //
            CreateMap<CreateContractDTO, Contract>()
                .ForMember(de => de.StartDate, option => option.MapFrom(d => DateTime.ParseExact(d.StartDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)));
            CreateMap<Contract, ContractDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ReverseMap();
            CreateMap<ContractType, ContractTypeDTO>()
                .ReverseMap();
            CreateMap<UserAccount, UserAccountDTO>().ReverseMap();
            CreateMap<Degree, DegreeDTO>().ReverseMap();

            CreateMap<Dependent, EmployeeDependentDTO>()
                .ForMember(de => de.Dobstring, option => option.MapFrom(d => d.Dob.Value.ToString("dd'-'MM'-'yyyy")))
                .ForMember(de => de.StartDatestring, option => option.MapFrom(d => d.StartDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ForMember(de => de.EndDatestring, option => option.MapFrom(d => d.EndDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<EmployeesStatusHistory, EmployeeHistoryDTO>()
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee!.FirstName + " " + d.Employee!.LastName))
                .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<RolesStatusHistory, RoleStatusHistoryDTO>()
                .ForMember(de => de.RoleName, option => option.MapFrom(d => d.Role!.RoleName))
                .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<ContractsStatusHistory, ContractStatusHistoryDTO>()
                .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<ContractTypeStatusHistory, ContractTypeHistoryDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ForMember(de => de.ActionDate, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<CreateShiftTypeDTO, ShiftType>()
               .ForMember(de => de.StartTime, option => option.MapFrom(d => DateTime.Parse(d.StartTimestring.ToString()).ToString("HH':'mm':'ss")))
               .ForMember(de => de.EndTime, option => option.MapFrom(d => DateTime.Parse(d.EndTimestring.ToString()).ToString("HH':'mm':'ss")));
            CreateMap<Team, TeamListDTO>()
               .ReverseMap();
            CreateMap<CreateWorkScheduleDTO, WorkSchedule>()
               .ForMember(de => de.StartDate, option => option.MapFrom(d => DateTime.ParseExact(d.StartDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)))
                .ForMember(de => de.EndDate, option => option.MapFrom(d => DateTime.ParseExact(d.EndDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)));
            CreateMap<Team, CreateTeamDTO>()
               .ReverseMap();
            CreateMap<WorkSchedule, WorkScheduleDTO>()
               .ForMember(de => de.ShiftTypeName, option => option.MapFrom(d => d.ShiftType!.TypeName))
               .ForMember(de => de.TeamName, option => option.MapFrom(d => d.Team!.TeamName))
               .ForMember(de => de.StartDatestring, option => option.MapFrom(d => d.StartDate.Value.ToString("dd'-'MM'-'yyyy")))
               .ForMember(de => de.EndDatestring, option => option.MapFrom(d => d.EndDate.Value.ToString("dd'-'MM'-'yyyy")))
               .ReverseMap();
            CreateMap<HistoryChangeShiftType, HistoryChangeShiftTypeDTO>()
                .ForMember(de => de.ShiftTypeName, option => option.MapFrom(d => d.ShiftType!.TypeName))
                .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
               .ReverseMap();
            CreateMap<HistoryChangeTeam, HistoryChangeTeamDTO>()
                .ForMember(de => de.TeamName, option => option.MapFrom(d => d.Team!.TeamName))
                .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
               .ReverseMap();
            CreateMap<WorkScheduleStatusHistory, WorkScheduleHistoryDTO>()
              .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
              .ReverseMap();
            CreateMap<HistoryChangeCheckInOut, HistoryChangeCheckInOutDTO>()
               .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
               .ReverseMap();
            CreateMap<UnitCostStatusHistory, UnitCostStatusHistoryDTO>()
               .ForMember(de => de.UniCostName, option => option.MapFrom(d => d.UniCost.UnitName))
               .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
              .ReverseMap();
            CreateMap<Page, PageDTO>()
                .ReverseMap();
            CreateMap<Employee, TeamMemberDTO>()
                .ForMember(de => de.FullName, option => option.MapFrom(d => d.FirstName + " " + d.LastName))
                .ForMember(de => de.CountryName, option => option.MapFrom(d => d.Country.CountryName))
                .ReverseMap();
            CreateMap<WorkArea, WorkAreasDTO>()
                .ReverseMap();
            CreateMap<UnitCost, UnitCostDTO>()
                .ReverseMap();
            CreateMap<CreateWageDTO, Wage>()
                .ForMember(de => de.StartDate, option => option.MapFrom(d => DateTime.ParseExact(d.StartDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)))
                .ForMember(de => de.EndDate, option => option.MapFrom(d => DateTime.ParseExact(d.EndDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)));
            CreateMap<Employee, LeadDetailDTO>()
               .ForMember(de => de.FullName, option => option.MapFrom(d => d.FirstName + " " + d.LastName))
               .ReverseMap();

            //Work
            CreateMap<WorkDTO, Work>()
                .ReverseMap();
            //Bonus
            CreateMap<PersonalRewardDTO, BonusDetail>()
               .ReverseMap();
            CreateMap<BonusDetail, DTO.AllRewardDTO.PR>()
              .ForMember(de => de.BonusDatestring, option => option.MapFrom(d => d.BonusDate.Value.ToString("dd'-'MM'-'yyyy")))
              .ForMember(de => de.Beneficiary, option => option.MapFrom(d => d.Employee.LastName + " " + d.Employee.FirstName))
              .ReverseMap();
            //WorkArea
            CreateMap<WorkArea, WorkAreasDTO>()
                 .ReverseMap();
            //SpecialOccasion
            CreateMap<SpecialOccasion, SpecialOccasionDTO>()
                .ReverseMap();
            //Holiday
            //CreateMap<HolidayDetailDTO, HolidaysDetail>()
            //     .ForMember(de => de.Date, option => option.MapFrom(d => DateTime.ParseExact(d.Datestring, "dd-MM-yyyy",
            //                       System.Globalization.CultureInfo.InvariantCulture)));
            CreateMap<Holiday, HolidayDTO>()
               .ReverseMap();
            //AdvanceSalary
            CreateMap<CreateAdvanceDTO, AdvancesSalary>();


            CreateMap<UpdateAdvanceDTO, AdvancesSalary>();

        }
    }
}
