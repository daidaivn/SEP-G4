using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.ISalaryDetail;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class SalaryDetailController : Controller
    {
        private readonly ISalaryDetailService _salaryDetailService;
        public SalaryDetailController(ISalaryDetailService salaryDetailService)
        {
            _salaryDetailService = salaryDetailService;
        }

        [HttpGet]
        public dynamic GetAllDetails()
        {
            try
            {
                var details = _salaryDetailService.GetAllSalaryDetail();
                if (details == null)
                {
                    return NotFound();
                }
                return Ok(details);
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public dynamic CreateAndUpdateDetail([FromBody] CreateSalaryDetailDTO createSalaryDetailDTO)
        {
            try
            {
                if (createSalaryDetailDTO.SalaryDetailId == 0)
                {
                    var newDetail = _salaryDetailService.AddSalaryDetail(createSalaryDetailDTO);
                    if (newDetail == null)
                    {
                        return NotFound();
                    }
                    return Ok(newDetail);
                }
                else
                {
                    var updateDetail = _salaryDetailService.UpdateSalaryDetail(createSalaryDetailDTO);
                    if (updateDetail == null)
                    {
                        return NotFound();
                    }
                    return Ok(updateDetail);
                }
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
       
    }
}
