using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IBonus;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class RewardController : Controller
    {
        private readonly IBonusService _bonusService;
        public RewardController(IBonusService bonusService)
        {
            _bonusService = bonusService;
        }

        [HttpPost]
        public IActionResult CreateAndEditPersonalReward([FromBody] PersonalRewardDTO personalRewardDTO)
        {
            try
            {
                var personal = _bonusService.CreateAndUpdatePersonalReward(personalRewardDTO);
                if (personal == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(personal);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }

        }
        [HttpPost]
        public IActionResult CreateAndEditCompanyReward([FromBody] CompanyRewardDTO companyRewardDTO)
        {
            try
            {
                var service = _bonusService.CreateAndUpdateCompanyRerward(companyRewardDTO);
                if (service == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(service);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpPost]
        public IActionResult CreateAndEditSpecialOccasion([FromBody] SpecialOccasionDTO specialOccasionDTO)
        {
            try
            {
                var service = _bonusService.CreateAndUpdateSpecialOccasion(specialOccasionDTO);
                if (service == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(service);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetAllRewards(string date)
        {
            try
            {
                var result = _bonusService.GetAllReward(date);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetPersonRewards(int id)
        {
            try
            {
                var result = _bonusService.GetPersonalReward(id);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetSpecialRewards(int id)
        {
            try
            {
                var result = _bonusService.GetSpecialOccasionReward(id);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
        [HttpGet]
        public IActionResult GetCompanyRewards(int id)
        {
            try
            {
                var result = _bonusService.GetCompanyReward(id);
                if (result == null)
                {
                    return BadRequest("Lỗi dữ liệu");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }
        }
    }
}
