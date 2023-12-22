using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HourWorkDayController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;

        public HourWorkDayController(SEPG4CWMSContext context)
        {
            _context = context;
        }
    }
}
