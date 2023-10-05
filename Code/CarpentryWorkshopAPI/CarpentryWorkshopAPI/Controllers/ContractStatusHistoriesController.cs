using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class ContractStatusHistoriesController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public ContractStatusHistoriesController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllHistory()
        {
            try
            {
                var historys = _context.ContractsStatusHistories.ToList();
                if (historys == null)
                {
                    return NotFound();
                }
                var cshDTO = _mapper.Map<List<ContractStatusHistoryDTO>>(historys);
                return Ok(cshDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetContractHistoryByDate([FromBody] SearchContractStatusHistoryDTO searchContractStatusHistoryDTO)
        {
            try
            {
                var historysbydate = _context.ContractsStatusHistories
                    .Where(x => x.ActionDate == searchContractStatusHistoryDTO.ActionDate)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound();
                }
                var historydateDTO = _mapper.Map<List<ContractStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult GetContractHistorys([FromBody] SearchContractStatusHistoryDTO searchContractStatusHistoryDTO)
        {
            try
            {
                var historysbydate = _context.ContractsStatusHistories
                    .Where(x => x.ActionDate ==searchContractStatusHistoryDTO.ActionDate
                    && x.ContractId == searchContractStatusHistoryDTO.ContractId)
                    .ToList();
                if (historysbydate == null)
                {
                    return NotFound();
                }
                var historydateDTO = _mapper.Map<List<ContractStatusHistoryDTO>>(historysbydate);
                return Ok(historydateDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
