using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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

            var employee = user.Employee;

            var roles = employee.RolesEmployees.Select(re => re.Role).AsQueryable();

            var pages = roles.SelectMany(r => r.Pages)
                            .Select(p => p.PageName)
                            .ToArray();

            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim("Name", employee.FirstName + " " + employee.LastName)
    };

            claims.AddRange(pages.Select(page => new Claim(ClaimTypes.Role, page)));

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(1),
                Audience = jwtSection["Audience"],
                Issuer = jwtSection["Issuer"],
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            var loginResponse = new
            {
                Token = tokenString,
                Name = employee.FirstName + " " + employee.LastName,
                Pages = pages,
                Roles = roles
            };

            return Ok(loginResponse);
        }


        private async Task<UserAccount> YourAuthenticationLogicAsync(string username, string password)
        {
            var userAccount = await _context.UserAccounts
                .Include(u => u.Employee)
                .ThenInclude(u => u.RolesEmployees)
                .ThenInclude(u => u.Role)
                .ThenInclude(u=>u.Pages)
                .FirstOrDefaultAsync(u => u.UserName == username && u.Password == password && u.Status == true);

            return userAccount;
        }
        // GET api/<AccountsController>/5
        //[HttpPut("hello")]
        //public IActionResult Get(int id)
        //{

        //    var role = _context.Roles.Where(re => re.RoleId == id).Include(r => r.RolePages).Select(p => p.RoleId.Select(pa => pa.PageName)).ToList();

        //    return Ok(role);
        //}

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
