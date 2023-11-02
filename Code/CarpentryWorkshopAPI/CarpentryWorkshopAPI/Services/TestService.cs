using AutoMapper;
using CarpentryWorkshopAPI.IServices;
using CarpentryWorkshopAPI.Models;

namespace CarpentryWorkshopAPI.Services
{
    public class TestService : ITestService
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public TestService(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public dynamic Test()
        {
            var roles = _context.Roles.ToList();
            return roles;
        }
    }
}
