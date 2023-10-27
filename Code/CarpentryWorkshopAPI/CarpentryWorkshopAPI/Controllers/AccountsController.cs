using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using Microsoft.EntityFrameworkCore;

using Microsoft.IdentityModel.Tokens;
using NuGet.Protocol.Plugins;
using Org.BouncyCastle.Crypto.Generators;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CCMSapi/[controller]/[action]")]
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
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            var user = await YourAuthenticationLogicAsync(request.UserName, passwordHash);
            if (user == null)
            {
                return Unauthorized("Sai rồi");
            }
            HttpContext.Session.SetInt32("CurrentEmployeeId", user.EmployeeId);
            var jwtSection = _configuration.GetSection("JWT");
            var secretKey = jwtSection["SecretKey"];
            var key = Encoding.UTF8.GetBytes(secretKey);

            var employee = user.Employee;

            var pages = user.Employee.RolesEmployees.SelectMany(u => u.Role.Pages).Select(p => p.PageName).ToArray();
            var roles = user.Employee.RolesEmployees.Select(u=>u.Role.RoleName).ToArray();
            var claims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim("Name", employee.FirstName + " " + employee.LastName)
            };
            foreach (var page in pages)
            {
                claims.Add(new Claim(ClaimTypes.Role, page));
            }
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
                Roles = roles,
                EmployeeID = employee.EmployeeId,
            };

            return Ok(loginResponse);
        }


        private async Task<UserAccount> YourAuthenticationLogicAsync(string username, string password)
        {
            var userAccount = await _context.UserAccounts
                .Include(u => u.Employee)
                .ThenInclude(u => u.RolesEmployees)
                .ThenInclude(u => u.Role)
                .ThenInclude(u => u.Pages)
                .FirstOrDefaultAsync(u => u.UserName == username && u.Status == true);
            if (!BCrypt.Net.BCrypt.Verify(username, userAccount.Password))
            {

                return userAccount;
            }
            else
            {
                userAccount = null;
            }
            return userAccount;
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync();
            return Ok("Logout successful.");
        }
        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateAccount([FromBody] CreateAccount request)
        {
            var acc = _context.UserAccounts.Where(us => us.UserName == request.UserName).SingleOrDefault();
            if (acc!=null) 
            {
                return BadRequest("acc already have");
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
            UserAccount ua = new UserAccount()
            {
                UserName = request.UserName,
                Password = passwordHash,
                EmployeeId = request.employeeId,
                Status= true,
            };
            _context.UserAccounts.Add(ua);
            _context.SaveChanges();
            return Ok(passwordHash);
        }
        [HttpPost]
        public async Task<IActionResult> ForgotPassword(string email)
        {
            await HttpContext.SignOutAsync();
            return Ok("Logout successful.");
        }
        // GET api/<AccountsController>/5
        //[HttpPut("hello")]
        //public IActionResult Get(int id)
        //{

        //    var role = _context.Roles.Where(re => re.RoleId == id).Include(r => r.RolePages).Select(p => p.RoleId.Select(pa => pa.PageName)).ToList();

        //    return Ok(role);
        //}

        // POST api/<AccountsController>
        [Authorize(Roles = "AccountsPage")]
        [HttpGet]
        public IActionResult Get()
        {
            if(_context == null)
            {
                return NotFound();
            }
            
            var role = _context.Roles.Include(ro=>ro.Pages).Where(ro => ro.RoleId == 3).FirstOrDefault();
            var page = _context.Pages.Where(pa => pa.PageId == 1).FirstOrDefault();
            role.Pages.Remove(page);
            //page.Roles.Remove(role);
            try
            {
                
                _context.SaveChanges();
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
            return Ok();
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
