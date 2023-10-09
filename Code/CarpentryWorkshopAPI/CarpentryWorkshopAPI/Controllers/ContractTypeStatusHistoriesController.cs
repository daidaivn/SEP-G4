using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class ContractTypeStatusHistoriesController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper ;
        public ContractTypeStatusHistoriesController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllHistories()
        {
            try
            {
                var histories = _context.ContractTypeStatusHistories
                    .Include(x => x.ContractType)
                    .ToList();
                if (histories == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<ContractTypeHistoryDTO>>(histories);
                return Ok(dto);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetHistoriesByContractType([FromBody] ContractTypeStatusHistoryDTO contractTypeStatusHistoryDTO)
        {
            try
            {
                List<ContractTypeStatusHistory> cth = new List<ContractTypeStatusHistory>();
                if (contractTypeStatusHistoryDTO.ContractTypeId != 0)
                {
                        cth = _context.ContractTypeStatusHistories
                        .Include(x => x.ContractType)
                        .Where(x => x.ContractTypeId == contractTypeStatusHistoryDTO.ContractTypeId)
                        .ToList();
                    if (cth == null)
                    {
                        return NotFound();
                    }
                  
                }
                var dto = _mapper.Map<List<ContractTypeHistoryDTO>>(cth);
                return Ok(dto);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetHistoriesByDate([FromBody] ContractTypeStatusHistoryDTO contractTypeStatusHistoryDTO)
        {
            try
            {
                List<ContractTypeStatusHistory> cth = new List<ContractTypeStatusHistory>();
                if (contractTypeStatusHistoryDTO.ActionDate.HasValue)
                {
                    cth = _context.ContractTypeStatusHistories
                    .Include(x => x.ContractType)
                    .Where(x => x.ActionDate == contractTypeStatusHistoryDTO.ActionDate)
                    .ToList();
                    if (cth == null)
                    {
                        return NotFound();
                    }

                }
                var dto = _mapper.Map<List<ContractTypeHistoryDTO>>(cth);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
