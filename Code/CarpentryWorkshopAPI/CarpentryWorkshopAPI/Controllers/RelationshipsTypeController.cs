using AutoMapper;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
    [ApiController]
    public class RelationshipsTypeController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public RelationshipsTypeController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllRelationshipsTypes()
        {
            var relationshipsType = _context.RelationshipsTypes
                .Select(re=> new RelationshipsType
                {
                    RelationshipId = re.RelationshipId, 
                    RelationshipName = re.RelationshipName,
                    Note = re.Note,
                    Status= re.Status,
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
                    Status = re.Status,
                })
                .FirstOrDefault();
            return Ok(relationshipsType);
        }

    }
}
