using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Humanizer;
using Microsoft.AspNetCore.Mvc;


namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class ContractTypeController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public ContractTypeController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        [HttpGet]
        public IActionResult GetAllContractType()
        {
            try
            {
                var contracttypes = _context.ContractTypes.ToList();
                if (contracttypes == null)
                {
                    return NotFound();
                }
                var dto = _mapper.Map<List<ContractTypeDTO>>(contracttypes);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult CreateAndUpdateContractType([FromBody] ContractTypeDTO contractTypeDTO)
        {
            try
            {
                if (contractTypeDTO.ContractTypeId == 0)
                {
                    var newctt = _mapper.Map<ContractType>(contractTypeDTO);
                    if (newctt == null)
                    {
                        return NotFound();
                    }
                    ContractTypeStatusHistory newhistory = new ContractTypeStatusHistory
                    {
                        Action = "Create",
                        ActionDate = DateTime.Now,
                    };
                    _context.ContractTypeStatusHistories.Add(newhistory);
                    _context.ContractTypes.Add(newctt);
                    _context.SaveChanges();
                    return Ok("Create contracttype successful");
                }
                else
                {
                    var newctt = _mapper.Map<ContractType>(contractTypeDTO);
                    if (newctt == null)
                    {
                        return NotFound();
                    }
                    ContractTypeStatusHistory newhistory = new ContractTypeStatusHistory
                    {
                        Action = "Update",
                        ActionDate = DateTime.Now,
                    };
                    _context.ContractTypeStatusHistories.Add(newhistory);
                    _context.ContractTypes.Update(newctt);
                    _context.SaveChanges();
                    return Ok("Update contracttype successful");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Filter([FromBody] ContractTypeDTO contractTypeDTO)
        {
            try
            {
                List<ContractType> contracttypefilter = new List<ContractType>();
                if (contractTypeDTO.Status.HasValue)
                {
                    contracttypefilter = _context.ContractTypes
                   .Where(x => x.Status == contractTypeDTO.Status)
                   .ToList();

                }
                var dto = _mapper.Map<List<ContractType>>(contracttypefilter);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
