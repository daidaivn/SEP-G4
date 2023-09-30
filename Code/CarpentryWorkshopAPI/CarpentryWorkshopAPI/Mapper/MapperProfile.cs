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
            CreateMap<RolesStatusHistory, RoleStatusHistoryDTO>()
                .ReverseMap();
            CreateMap<Dependent, DependentDTO>()
                .ForMember(de => de.EmployeesName, option => option.MapFrom(d => d.Employee.FirstName +" "+ d.Employee.LastName))
                .ForMember(de => de.GenderString, option => option.MapFrom(d => d.Gender == true? "nam" : "nữ"))
                .ReverseMap();
        }
    }
}
