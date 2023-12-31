﻿using AutoMapper;
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
    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;
        private readonly IAccountService _accountService;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        public AccountsController(SEPG4CWMSContext context, IMapper mapper, IConfiguration configuration, IAccountService accountService)
        {
            _context = context;
            _mapper = mapper;
            _accountService = accountService;
            _configuration = configuration;
        }
        [HttpPost("gettoken")]
        public async Task<IActionResult> GetToken([FromBody] LoginRequest request)
        {
            try
            {
                //string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);

                var user = await YourAuthenticationLogicAsync(request.UserName, request.Password);
                if (user == null)
                {
                    return Unauthorized("Tài khoản không đúng.");
                }
                HttpContext.Session.SetInt32("CurrentEmployeeId", user.EmployeeId);
                var jwtSection = _configuration.GetSection("JWT");
                var secretKey = jwtSection["SecretKey"];
                var key = Encoding.UTF8.GetBytes(secretKey);

                var employee = user.Employee;
                if (employee.Status == false)
                {
                    return Unauthorized("Tài khoản không có quyền vào trang web");
                }
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
                    UserAccount = user.UserName,
                };

                return Ok(loginResponse);
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi máy chủ");
            }
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
                return BadRequest("Đăng xuất thất bại.");
            }

            // Here, you can implement additional logic to invalidate the token (e.g., blacklist)
            // For simplicity, we assume that removing the claim is sufficient for "logout"

            return Ok("Đăng xuất thành công.");
        }


        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateAccount([FromBody] CreateAccount request)
        {
            var acc = _context.UserAccounts.Where(us => us.UserName == request.UserName).SingleOrDefault();
            if (acc != null)
            {
                return BadRequest("Tài khoản này đã tồn tại.");
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
            return Ok("Đăng xuất thành công");
        }
        [HttpPost]
        public async Task<IActionResult> ForgotPassword(string emailInput)
        {
            try
            {
                if (string.IsNullOrEmpty(emailInput))
                {
                    return BadRequest("Vui lòng nhập thông tin");
                }
                var account = await _context.UserAccounts.Include(ua => ua.Employee).Where(ua => ua.Employee.Email == emailInput).FirstOrDefaultAsync();
                if (account == null)
                {
                    return BadRequest("Tài khoản này không tồn tại");
                }
                if (account.Employee.Status == false)
                {
                    return BadRequest("Tài khoản không còn quyền vào hệ thống");
                }
                var user = account.UserName;
                var pass = _accountService.GenerateRandomString(8);
                account.Password = BCrypt.Net.BCrypt.HashPassword(pass);
                _context.UserAccounts.Update(account);
                _context.SaveChanges();
                string htmlBody = $"<p>Xin chào, {account.Employee.FirstName + " " + account.Employee.LastName},</p>" +
                    "<p>Bạn vừa yêu cầu thay đổi mật khẩu tài khoản của bạn.</p>" +
                    "<p>Thông tin tài khoản và mật khẩu mới của bạn như sau:</p>" +
                    "<ul>" +
                        $"<li><strong>tên tài khoản: </strong>{user}</li>" +
                        $"<li><strong>mật khẩu: </strong>{pass}</li>" +
                    "</ul>" +
                    "<p>Bạn có thể đăng nhập vào tài khoản và thay đổi tài khoản mật khẩu của mình tại <a href='https://sep-g4-client.azurewebsites.net'>https://sep-g4-client.azurewebsites.net</a>.</p>" +
                    "<p><strong>Tuyệt đối không cung cấp tài khoản mật khẩu cho bất cứ ai</strong></p>" +
                    "<p>Trân trọng,</p>" +
                    "<p>Công Ty Phú Cầu</p>";
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
                return Ok("Tài khoản của bạn đã được gửi đến Email. Vui lòng kiểm tra");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
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
                    return BadRequest("Tên đăng nhập hoặc mật khẩu không đúng");
                }
                var user = loginRequest.UserName;
                var userAccout = _context.UserAccounts.Where(ua => ua.UserName == user && ua.EmployeeId != loginRequest.Id).FirstOrDefault();
                if (userAccout != null)
                {
                    return BadRequest("Tài khoản đã tồn tại");
                }
                var pass = loginRequest.Password;
                account.UserName = user;
                account.Password = BCrypt.Net.BCrypt.HashPassword(pass);
                _context.UserAccounts.Update(account);
                _context.SaveChanges();
                string htmlBody = $"<p>Xin chào, {account.Employee.FirstName + " " + account.Employee.LastName},</p>" +
                    "<p>Bạn vừa yêu cầu thay đổi tài khoản và mật khẩu của bạn.</p>" +
                    "<p>Thông tin tài khoản và mật khẩu mới của bạn như sau:</p>" +
                    "<ul>" +
                        $"<li><strong>tên tài khoản: </strong>{user}</li>" +
                        $"<li><strong>mật khẩu: </strong>{pass}</li>" +
                    "</ul>" +
                    "<p>Bạn có thể đăng nhập vào tài khoản và thay đổi tài khoản mật khẩu của mình tại <a href='https://sep-g4-client.azurewebsites.net'>https://sep-g4-client.azurewebsites.net</a>.</p>" +
                    "<p><strong>Tuyệt đối không cung cấp tài khoản mật khẩu cho bất cứ ai</strong></p>" +
                    "<p>Trân trọng,</p>" +
                    "<p>Công Ty Phú Cầu</p>";
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
                return Ok("Tài khoản của bạn đã được gửi đến Email. Vui lòng kiểm tra");
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");
            }

        }

    }
}
