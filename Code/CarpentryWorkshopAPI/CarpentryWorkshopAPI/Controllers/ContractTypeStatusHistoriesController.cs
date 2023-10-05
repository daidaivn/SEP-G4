using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

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
                var histories = _context.ContractTypeStatusHistories.ToList();
                if (histories == null)
                {
                    return NotFound();
                }
                return Ok(histories);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetHistoriesByContractType([FromBody] ContractTypeStatusHistoryDTO contractTypeStatusHistoryDTO)
        {
            try
            {
                List<ContractTypeStatusHistory> cth = new List<ContractTypeStatusHistory>();
                if (contractTypeStatusHistoryDTO.ContractTypeId != 0)
                {
                        cth = _context.ContractTypeStatusHistories
                        .Where(x => x.ContractTypeId == contractTypeStatusHistoryDTO.ContractTypeId)
                        .ToList();
                    if (cth == null)
                    {
                        return NotFound();
                    }
                  
                }
                return Ok(cth);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetHistoriesByDate([FromBody] ContractTypeStatusHistoryDTO contractTypeStatusHistoryDTO)
        {
            try
            {
                List<ContractTypeStatusHistory> cth = new List<ContractTypeStatusHistory>();
                if (contractTypeStatusHistoryDTO.ActionDate.HasValue)
                {
                    cth = _context.ContractTypeStatusHistories
                    .Where(x => x.ActionDate == contractTypeStatusHistoryDTO.ActionDate)
                    .ToList();
                    if (cth == null)
                    {
                        return NotFound();
                    }

                }
                return Ok(cth);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
