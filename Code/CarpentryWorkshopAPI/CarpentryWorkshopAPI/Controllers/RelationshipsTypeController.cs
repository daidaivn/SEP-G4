using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class RelationshipsTypeController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IMapper _mapper;
        public RelationshipsTypeController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllRelationshipsTypes()
        {
            var relationshipsType = _context.RelationshipsTypes
                .Select(re => new RelationshipsType
                {
                    RelationshipId = re.RelationshipId,
                    RelationshipName = re.RelationshipName,
                    Note = re.Note,
                })
                .ToList();
            return Ok(relationshipsType);
        }
        [HttpGet("{rtId}")]
        public IActionResult GetRelationshipsTypeById(int rtId)
        {
            var relationshipsType = _context.RelationshipsTypes.Where(rt => rt.RelationshipId == rtId)
                .Select(re => new RelationshipsType
                {
                    RelationshipId = re.RelationshipId,
                    RelationshipName = re.RelationshipName,
                    Note = re.Note,
                })
                .FirstOrDefault();
            return Ok(relationshipsType);
        }

    }
}
