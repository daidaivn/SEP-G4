using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.IServices.Account;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using Microsoft.IdentityModel.Tokens;
using MimeKit;
using MimeKit.Text;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly IAccountService _accountService;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AccountsController(SEPG4CCMSContext context, IMapper mapper, IConfiguration configuration, IAccountService accountService)
        {
            _context = context;
            _mapper = mapper;
            _accountService = accountService;
            _configuration = configuration;
        }
        [HttpPost("gettoken")]
        public async Task<IActionResult> GetToken([FromBody] LoginRequest request)
        {
            //string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

            var user = await YourAuthenticationLogicAsync(request.UserName, request.Password);
            if (user == null)
            {
                return Unauthorized("Sai rồi");
            }
            HttpContext.Session.SetInt32("CurrentEmployeeId", user.EmployeeId);
            var jwtSection = _configuration.GetSection("JWT");
            var secretKey = jwtSection["SecretKey"];
            var key = Encoding.UTF8.GetBytes(secretKey);

            var employee = user.Employee;

            var pages = user.Employee.RolesEmployees.Where(re => re.EndDate == null).SelectMany(u => u.Role.Pages).Select(p => p.PageName).Distinct().ToArray();
            var roles = user.Employee.RolesEmployees.Where(re => re.EndDate == null).Select(u => u.Role.RoleName).ToArray();
            var departments = user.Employee.RolesEmployees.Where(re => re.EndDate == null).Select(u => u.Department.DepartmentName).ToArray();
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
                Expires = DateTime.UtcNow.AddHours(8),
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
                Department = departments,
                EmployeeID = employee.EmployeeId,
                UserAccount = user.UserName
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
                .Include(u => u.Employee)
                .ThenInclude(u => u.RolesEmployees)
                .ThenInclude(u => u.Department)
                .FirstOrDefaultAsync(u => u.UserName == username && u.Status == true);

            if (userAccount == null)
            {
                // User account not found or is inactive (Status is false)
                return null;
            }

            if (!BCrypt.Net.BCrypt.Verify(password, userAccount.Password))
            {
                // Password does not match
                return null;
            }

            // Authentication succeeded, return the user account
            return userAccount;
        }


        [HttpPost("logout")]
        public IActionResult Logout(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"])),
                ValidateIssuer = false,
                ValidateAudience = false,
                RequireExpirationTime = true,
                ValidateLifetime = true,
            };

            SecurityToken validatedToken;
            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                // Remove a specific claim (e.g., "YourClaimType")
                var identity = (ClaimsIdentity)claimsPrincipal.Identity;
                Claim claimToRemove = identity.FindFirst(claim => claim.Type == "Role");

                if (claimToRemove != null)
                {
                    identity.RemoveClaim(claimToRemove);
                    Console.WriteLine($"Claim 'YourClaimType' removed successfully.");
                }
                else
                {
                    Console.WriteLine($"Claim 'YourClaimType' not found.");
                }
            }
            catch (Exception ex)
            {
                // Token validation failed
                Console.WriteLine($"Token validation failed: {ex.Message}");
                return BadRequest("Logout failed");
            }

            // Here, you can implement additional logic to invalidate the token (e.g., blacklist)
            // For simplicity, we assume that removing the claim is sufficient for "logout"

            return Ok("Logout successful.");
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateAccount([FromBody] CreateAccount request)
        {
            var acc = _context.UserAccounts.Where(us => us.UserName == request.UserName).SingleOrDefault();
            if (acc != null)
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
                Status = true,
            };
            _context.UserAccounts.Add(ua);
            _context.SaveChanges();
            return Ok(passwordHash);
        }
        [HttpPost]
        public async Task<IActionResult> LogOut()
        {
            await HttpContext.SignOutAsync();
            return Ok("Logout successful.");
        }
        [HttpPost]
        public async Task<IActionResult> ForgotPassword(string emailInput)
        {
            try
            {
                if (string.IsNullOrEmpty(emailInput))
                {
                    return BadRequest("not have data");
                }
                var account = await _context.UserAccounts.Include(ua => ua.Employee).Where(ua => ua.Employee.Email == emailInput).FirstOrDefaultAsync();
                if (account == null)
                {
                    return BadRequest("not have this account");
                }
                var user = account.UserName;
                var pass = _accountService.GenerateRandomString(8);
                account.Password = BCrypt.Net.BCrypt.HashPassword(pass);
                _context.UserAccounts.Update(account);
                _context.SaveChanges();
                string htmlBody = "<p>Xin chào,</p>" +
                      "<p>Dưới đây là nội dung email của bạn:</p>" +
                      "<p><strong>Đây là tài khoản của bạn sau khi thay đổi</strong></p>" +
                      "<h3>Tài khoản:</h3>" + $"<h4>{user}</h4>" +
                      "<h3>Mật khẩu: </h3>" + $"<h4>{pass}</h4>" +
                      "<p><strong>Nghiêm cấm lộ tài khoản ra ngoài</strong></p>" +
                      "<p>Cảm ơn bạn đã đọc email này.</p>";
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("ccmsadm12@gmail.com"));
                email.To.Add(MailboxAddress.Parse($"{emailInput}"));
                email.Subject = "Tài khoản của nhân viên";
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = htmlBody
                };
                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate("ccmsadm12@gmail.com", "iqmfipjieykysglr");
                smtp.Send(email);
                smtp.Disconnect(true);
                smtp.Dispose();
                return Ok("forgot success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPost]
        public async Task<IActionResult> ChangeUserNameAndPassWord([FromBody] ChangeUserAccountDTO loginRequest)
        {
            try
            {
                var account = await _context.UserAccounts.Include(ua => ua.Employee).Where(ua => ua.EmployeeId == loginRequest.Id).FirstOrDefaultAsync();
                if (account == null)
                {
                    return BadRequest("useraname or password not right");
                }

                var user = loginRequest.UserName;
                var pass = loginRequest.Password;
                account.UserName = user;
                account.Password = BCrypt.Net.BCrypt.HashPassword(pass);
                _context.UserAccounts.Update(account);
                _context.SaveChanges();
                string htmlBody = "<p>Xin chào,</p>" +
                      "<p>Dưới đây là nội dung email của bạn:</p>" +
                      "<p><strong>Đây là tài khoản của bạn sau khi thay đổi</strong></p>" +
                      "<h3>Tài khoản:</h3>" + $"<h4>{user}</h4>" +
                      "<h3>Mật khẩu: </h3>" + $"<h4>{pass}</h4>" +
                      "<p><strong>Nghiêm cấm lộ tài khoản ra ngoài</strong></p>" +
                      "<p>Cảm ơn bạn đã đọc email này.</p>";
                var email = new MimeMessage();
                email.From.Add(MailboxAddress.Parse("ccmsadm12@gmail.com"));
                email.To.Add(MailboxAddress.Parse($"{account.Employee.Email}"));
                email.Subject = "Tài khoản của nhân viên";
                email.Body = new TextPart(TextFormat.Html)
                {
                    Text = htmlBody
                };
                using var smtp = new MailKit.Net.Smtp.SmtpClient();
                smtp.Connect("smtp.gmail.com", 587, MailKit.Security.SecureSocketOptions.StartTls);
                smtp.Authenticate("ccmsadm12@gmail.com", "iqmfipjieykysglr");
                smtp.Send(email);
                smtp.Disconnect(true);
                smtp.Dispose();
                return Ok("change success");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

    }
}
