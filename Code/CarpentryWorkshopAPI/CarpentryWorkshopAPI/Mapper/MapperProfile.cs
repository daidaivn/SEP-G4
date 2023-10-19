using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using System.Globalization;

namespace CarpentryWorkshopAPI.Mapper
{
    public class MapperProfile : Profile
    {
        public MapperProfile() 
        {
            
            CreateMap<Employee, CreateEmployeeDTO>()
               .ReverseMap();
            CreateMap<Employee, EmployeeSearchDTO>() 
               .ReverseMap();
            CreateMap<Employee, TeamMemberDTO>()
               .ForMember(de => de.Dobstring, option => option.MapFrom(d => d.Dob!.Value.ToString("dd'-'MM'-'yyyy")))
               .ForMember(de => de.Gender, option => option.MapFrom(d => (bool)d.Gender ? "Nam" : "Nữ"))
               .ForMember(de => de.FullName, option => option.MapFrom(d => d.FirstName + " " + d.LastName))
               .ReverseMap();
            CreateMap<Role, RoleDTO>()
               .ReverseMap();
            CreateMap<Department, DepartmentDTO>()
                .ForMember(de=>de.number,option=>option.MapFrom(d=>d.RolesEmployees.Select(re=>re.EmployeeId).Distinct().Count()))
                .ReverseMap();         
            CreateMap<Dependent, DependentDTO>()
                .ReverseMap();
            CreateMap<Dependent, DependentListDTO>()
                .ForMember(de => de.EmployeesName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ForMember(de => de.GenderString, option => option.MapFrom(d => d.Gender == true ? "nam" : "nữ"))
                .ForMember(de => de.DobString, option => option.MapFrom(d => d.Dob != null ? d.Dob.Value.ToString("dd'-'MM'-'yyyy") : ""))
                .ForMember(de => de.StartDateString, option => option.MapFrom(d => d.StartDate != null ? d.StartDate.Value.ToString("dd'-'MM'-'yyyy") : ""))
                .ForMember(de => de.EndDateString, option => option.MapFrom(d => d.EndDate != null ? d.EndDate.Value.ToString("dd'-'MM'-'yyyy") : ""));
            CreateMap<CreateContractDTO, Contract>()
                .ForMember(de => de.StartDate, option => option.MapFrom(d => DateTime.ParseExact(d.StartDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture) ))
                .ForMember(de => de.EndDate, option => option.MapFrom(d => DateTime.ParseExact(d.EndDatestring, "dd-MM-yyyy",
                                   System.Globalization.CultureInfo.InvariantCulture)));
            CreateMap<Contract, ContractDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ReverseMap();
            CreateMap<ContractType, ContractTypeDTO>()
                .ReverseMap();

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
            CreateMap<ShiftType, CreateShiftTypeDTO>()
               .ReverseMap();
            CreateMap<Team, TeamListDTO>()
               .ReverseMap();
            CreateMap<Team, CreateTeamDTO>()
               .ReverseMap();
            CreateMap<WorkSchedule, WorkScheduleDTO>()
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
              .ReverseMap();
            CreateMap<HistoryChangeTimeTracking, HistoryChangeTimeTrackingDTO>()
                .ForMember(de => de.ActionDatestring, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
               .ReverseMap();
        }
    }
}
