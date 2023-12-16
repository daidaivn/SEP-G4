using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
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
                    return NotFound("Không tìm thấy dữ liệu");
                }
                var dto = _mapper.Map<List<ContractTypeDTO>>(contracttypes);
                return Ok(dto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

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
                        return NotFound("Không tìm thấy dữ liệu");
                    }
                    _context.ContractTypes.Add(newctt);
                    _context.SaveChanges();
                    ContractTypeStatusHistory newhistory = new ContractTypeStatusHistory
                    {
                        ContractTypeId = newctt.ContractTypeId,
                        Action = "Create",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.ContractTypeStatusHistories.Add(newhistory);
                    _context.SaveChanges();
                    return Ok("Tạo loại hợp đồng thành công");
                }
                else
                {
                    var newctt = _mapper.Map<ContractType>(contractTypeDTO);
                    if (newctt == null)
                    {
                        return NotFound("Không tìm thấy dữ liệu");
                    }
                    _context.ContractTypes.Update(newctt);
                    ContractTypeStatusHistory newhistory = new ContractTypeStatusHistory
                    {
                        ContractTypeId = newctt.ContractTypeId,
                        Action = "Update",
                        ActionDate = DateTime.Now,
                        CurrentEmployeeId = null,
                    };
                    _context.ContractTypeStatusHistories.Add(newhistory);
                    _context.SaveChanges();
                    return Ok("Tạo loại hợp đồng thành công");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Lỗi máy chủ");

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
                return StatusCode(500, "Lỗi máy chủ");

            }
        }
    }
}
