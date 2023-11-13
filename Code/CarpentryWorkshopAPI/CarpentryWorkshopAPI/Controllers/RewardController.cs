using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("CCMSapi/[controller]/[action]")]
    public class RewardController : Controller
    {
        private readonly SEPG4CCMSContext
        public IActionResult Index()
        {
            return View();
        }
    }
}
