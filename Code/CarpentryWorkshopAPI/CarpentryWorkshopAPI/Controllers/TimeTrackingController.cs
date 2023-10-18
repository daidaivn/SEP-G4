using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class TimeTrackingController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public TimeTrackingController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        //[HttpPost]
        //public IActionResult CheckIn(bool checkin, int eid)
        //{
        //    try
        //    {

        //    }
           
        //}
    }
}
