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
            CreateMap<Role, RoleDTO>()
               .ReverseMap();
            CreateMap<Department, DepartmentDTO>()
                .ForMember(de=>de.number,option=>option.MapFrom(d=>d.RolesEmployees.Select(re=>re.EmployeeId).Distinct().Count()))
               .ReverseMap();         
            CreateMap<Dependent, DependentDTO>()
                .ForMember(de => de.EmployeesName, option => option.MapFrom(d => d.Employee.FirstName +" "+ d.Employee.LastName))
                .ForMember(de => de.GenderString, option => option.MapFrom(d => d.Gender == true? "nam" : "nữ"))
                .ReverseMap();
            CreateMap<Dependent, DependentListDTO>()
                .ForMember(de => de.EmployeesName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ForMember(de => de.GenderString, option => option.MapFrom(d => d.Gender == true ? "nam" : "nữ"))
                .ForMember(de=>de.DobString, option => option.MapFrom(d => string.Format("ngày {0:dd} tháng {0:MM} năm {0:yyyy}", d.Dob)))
                .ForMember(de => de.StartDateString, option => option.MapFrom(d => d.StartDate != null ? string.Format("ngày {0:dd} tháng {0:MM} năm {0:yyyy}", d.StartDate) : ""))
                .ForMember(de => de.EndDateString, option => option.MapFrom(d => d.EndDate != null ? string.Format("ngày {0:dd} tháng {0:MM} năm {0:yyyy}", d.EndDate) : ""));
            CreateMap<Contract, CreateContractDTO>()
                .ReverseMap();
            CreateMap<Contract, ContractDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee.FirstName + " " + d.Employee.LastName))
                .ReverseMap();
            CreateMap<ContractType, ContractTypeDTO>()
                .ReverseMap();

            CreateMap<Degree, DegreeDTO>().ReverseMap();

            CreateMap<Dependent, EmployeeDependentDTO>()
                .ReverseMap();
            CreateMap<EmployeesStatusHistory, EmployeeHistoryDTO>()
                .ForMember(de => de.EmployeeName, option => option.MapFrom(d => d.Employee!.FirstName + " " + d.Employee!.LastName))
                .ReverseMap();
            CreateMap<RolesStatusHistory, RoleStatusHistoryDTO>()
                .ForMember(de => de.RoleName, option => option.MapFrom(d => d.Role!.RoleName))
                .ReverseMap();
            CreateMap<ContractsStatusHistory, ContractStatusHistoryDTO>()
                .ReverseMap();
            CreateMap<ContractTypeStatusHistory, ContractTypeHistoryDTO>()
                .ForMember(de => de.ContractTypeName, option => option.MapFrom(d => d.ContractType!.ContractName))
                .ReverseMap();

        }
    }
}
