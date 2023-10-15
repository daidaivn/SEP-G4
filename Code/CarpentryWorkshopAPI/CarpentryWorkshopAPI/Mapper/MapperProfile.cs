using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;

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
            CreateMap<Role, RoleDTO>()
               .ReverseMap();
            CreateMap<Department, DepartmentDTO>()
                .ForMember(de=>de.number,option=>option.MapFrom(d=>d.RolesEmployees.Select(re=>re.EmployeeId).Distinct().Count()))
               .ReverseMap();         
            CreateMap<Dependent, DependentDTO>()
                .ForMember(de => de.EmployeesName, option => option.MapFrom(d => d.Employee.FirstName +" "+ d.Employee.LastName))
                .ForMember(de => de.GenderString, option => option.MapFrom(d => d.Gender == true? "nam" : "nữ"))
                .ReverseMap();
            CreateMap<Contract, CreateContractDTO>()
                .ReverseMap();
            CreateMap<Contract, ContractDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ReverseMap();
            CreateMap<ContractType, ContractTypeDTO>()
                .ReverseMap();
            CreateMap<Dependent, EmployeeDependentDTO>()
                .ForMember(de => de.Dobstring, option => option.MapFrom(d => d.Dob.Value.ToString("dd'-'MM'-'yyyy")))
                .ForMember(de => de.StartDatestring, option => option.MapFrom(d => d.StartDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ForMember(de => de.EndDatestring, option => option.MapFrom(d => d.EndDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<EmployeesStatusHistory, EmployeeHistoryDTO>()
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee!.FirstName + " " + d.Employee!.LastName))
                .ForMember(de => de.ActionDate, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<RolesStatusHistory, RoleStatusHistoryDTO>()
                .ForMember(de => de.RoleName, option => option.MapFrom(d => d.Role!.RoleName))
                .ForMember(de => de.ActionDate, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<ContractsStatusHistory, ContractStatusHistoryDTO>()
                .ForMember(de => de.ActionDate, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
            CreateMap<ContractTypeStatusHistory, ContractTypeHistoryDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ForMember(de => de.ActionDate, option => option.MapFrom(d => d.ActionDate.Value.ToString("dd'-'MM'-'yyyy")))
                .ReverseMap();
        }
    }
}
