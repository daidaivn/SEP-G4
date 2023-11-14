using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Humanizer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class RewardController : Controller
    {
        private readonly SEPG4CCMSContext _context;
        private readonly IMapper _mapper;
        public RewardController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public IActionResult PersonalReward([FromBody] PersonalRewardDTO personalRewardDTO)
        {
            //try
            //{
            //    SalaryDetail newdetail = new SalaryDetail()
            //    {
            //        Amount= personalRewardDTO.Amount,
            //        StartDate = DateTime.Now,
            //        EndDate= DateTime.Now,
            //        SalaryTypeId= personalRewardDTO.SalaryTypeId,
            //        EmployeeId= personalRewardDTO.EmployeeId,
            //    };
            //    if (newdetail == null)
            //    {
            //        return NotFound();
            //    }
            //    _context.SalaryDetails.Add(newdetail);
            //    _context.SaveChanges();
            //    return Ok("Add personal reward successful");
            //}catch(Exception ex)
            //{
            //    return BadRequest(ex.Message);
            //}
            return Ok();
        }
        [HttpPost]
        public IActionResult CompanyReward([FromBody] CompanyRewardDTO companyRewardDTO)
        {
            try
            {
                var allemployees = _context.Employees
                    .Include(x => x.RolesEmployees)
                    .Where(e => e.RolesEmployees.Any(re => re.EndDate == null))
                    .ToList();
                if (allemployees.Count == 0)
                {
                    return NotFound();
                }
                foreach (var item in allemployees)
                {
                    SalaryDetail newdetail = new SalaryDetail()
                    {
                        Amount = companyRewardDTO.Amount,
                        StartDate = DateTime.Now,
                        EndDate = DateTime.Now,
                        SalaryTypeId = companyRewardDTO.SalaryTypeId,
                        EmployeeId = item.EmployeeId,
                    };
                    //_context.SalaryDetails.Add(newdetail);
                    _context.SaveChanges();
                }
                return Ok("Add company reward successful");
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        public IActionResult GetAllReward(string time)
        {
            try
            {

                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
