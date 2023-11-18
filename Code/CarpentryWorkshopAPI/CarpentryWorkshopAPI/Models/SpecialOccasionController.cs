using AutoMapper;
using CarpentryWorkshopAPI.IServices.SpecialOccasion;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Models
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class SpecialOccasionController : ControllerBase
    {
        private readonly ISpecialOccasion _service;
        private readonly IMapper _mapper;

        public SpecialOccasionController(ISpecialOccasion service, IMapper mapper)
        {
           _service= service;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllSpecialOccasion()
        {
            return Ok(_service.GetAllSpecialOccasion());
        }
    }
}
