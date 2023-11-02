using CarpentryWorkshopAPI.IServices;
using CarpentryWorkshopAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CarpentryWorkshopAPI.Controllers
{
    [ApiController]
    [Route("test")]
    public class TestController : Controller
    {
        private readonly ITestService testService;
        public TestController(ITestService testService)
        {
            this.testService = testService;
        }

        [HttpGet]
        public dynamic TestList()
        {
            try
            {
                return testService.Test();
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
