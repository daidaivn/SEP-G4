using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
                var historys = _context.ContractsStatusHistories
                    .Include(x => x.Contract)
                    .ToList();
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
                DateTime startDate = searchContractStatusHistoryDTO.ActionDate!.Value.Date;
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.ContractsStatusHistories
                    .Include(x => x.Contract)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate)
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
                DateTime startDate = searchContractStatusHistoryDTO.ActionDate!.Value.Date;
                DateTime endDate = startDate.AddDays(1).AddSeconds(-1);
                var historysbydate = _context.ContractsStatusHistories
                    .Include(x => x.Contract)
                    .Where(x => x.ActionDate >= startDate && x.ActionDate <= endDate
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
