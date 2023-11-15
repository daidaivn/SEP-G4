using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.IBonus;
using CarpentryWorkshopAPI.Models;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto;
using System.Globalization;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class RewardController : Controller
    {
        private readonly IBonusService _bonusService ;
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
                    return BadRequest();
                }
                return Ok(personal);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                    return BadRequest();
                }
                return Ok(service); 
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                    return BadRequest();
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
