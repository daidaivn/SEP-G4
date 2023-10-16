using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AccountsController(SEPG4CCMSContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }
        [HttpPost("gettoken")]
        public async Task<IActionResult> GetToken([FromBody] LoginRequest request)
        {
            var user = await YourAuthenticationLogicAsync(request.UserName, request.Password);
            if (user == null)
            {
                return Unauthorized("Sai rồi");
            }

            var jwtSection = _configuration.GetSection("JWT");
            var secretKey = jwtSection["SecretKey"];
            var key = Encoding.UTF8.GetBytes(secretKey);
            LoginReponse loginReponse = new LoginReponse();
            var roleList = user.Employee.RolesEmployees.Select(re=>re.Role).ToList();
          
                
                
            var roles = user.Employee.RolesEmployees.Select(u => u.Role.RoleName).ToArray();
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName)

    };

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role))); // Thêm các vai trò vào danh sách claims

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Audience = "AudienceKey",
                Issuer = "IssuerKey",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            
            
            

            return Ok(tokenString);
        }

        //[HttpGet]
        //public async Task<IActionResult> GetToken([FromBody] LoginRequest request)
        //{

        //    return new string[] { "value1", "value2" };
        //}
        private async Task<UserAccount> YourAuthenticationLogicAsync(string username, string password)
        {
            var userAccount = await _context.UserAccounts
                .Include(u => u.Employee)
                .ThenInclude(u=>u.RolesEmployees)
                .ThenInclude(u=>u.Role)
                .FirstOrDefaultAsync(u => u.UserName == username && u.Password == password && u.Status == true);

            return userAccount;
        }
        // GET api/<AccountsController>/5
        [HttpPut("hello")]
        public IActionResult Get(int id)
        {

            var role = _context.Roles.Where(re=>re.RoleId == id).Include(r=>r.Pages).Select(p=>p.Pages.Select(pa=>pa.PageName)).ToList();

            return Ok(role);
        }

        // POST api/<AccountsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AccountsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AccountsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
