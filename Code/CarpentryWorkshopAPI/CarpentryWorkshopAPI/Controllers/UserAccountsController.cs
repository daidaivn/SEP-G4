﻿using AutoMapper;
using CarpentryWorkshopAPI.DTO;
using CarpentryWorkshopAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("CWMSapi/[controller]/[action]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly SEPG4CWMSContext _context;
        private IMapper _mapper;

        public UserAccountsController(SEPG4CWMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        //[Authorize(Roles = "UserAccountsPage")]
        // GET: api/UserAccounts
        [HttpGet]
        public IActionResult GetAllUserAccounts()
        {
            if (_context.UserAccounts == null)
            {
                return NotFound();
            }
            var userAccount = _context.UserAccounts
                  .Include(u => u.Employee)
                  .ThenInclude(u => u.RolesEmployees)
                  .ThenInclude(u => u.Role)
                  .ThenInclude(u => u.Pages)
                  .Select(ua => new UserAccountListDTO
                  {
                      EmployeeId = ua.EmployeeId,
                      UserName = ua.UserName,
                      Password = ua.Password,
                      PageName = ua.Employee.RolesEmployees.SelectMany(u => u.Role.Pages).Select(p => p.PageName).ToList(),
                      EmployeeName = ua.Employee.FirstName + " " + ua.Employee.LastName,
                  });
            return Ok(userAccount);
        }

        // GET: api/UserAccounts/5
        [HttpGet("{id}")]
        public IActionResult GetUserAccountById(int id)
        {
            if (_context.UserAccounts == null)
            {
                return NotFound();
            }
            var userAccount = _context.UserAccounts
                  .Where(ua => ua.EmployeeId == id)
                  .Include(u => u.Employee)
                  .ThenInclude(u => u.RolesEmployees)
                  .ThenInclude(u => u.Role)
                  .ThenInclude(u => u.Pages)
                  .Select(ua => new UserAccountListDTO
                  {
                      EmployeeId = ua.EmployeeId,
                      UserName = ua.UserName,
                      Password = ua.Password,
                      PageName = ua.Employee.RolesEmployees.SelectMany(u => u.Role.Pages).Select(p => p.PageName).ToList(),
                      EmployeeName = ua.Employee.FirstName + " " + ua.Employee.LastName,
                  }).SingleOrDefault();

            if (userAccount == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }
            else
            {
                return Ok(userAccount);
            }


        }

        // PUT: api/UserAccounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut]
        public IActionResult UpdateUserAccount([FromBody] UserAccountDTO userAccountDTO)
        {
            var userAccount = _mapper.Map<UserAccount>(userAccountDTO);
            if (_context.UserAccounts == null)
            {
                return Problem("Entity set 'SEPG4CWMSContext.UserAccounts'  is null.");
            }
            if (userAccount == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }
            _context.UserAccounts.Update(userAccount);

            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest("Lỗi dữ liệu");

            }
            return Ok("Chỉnh sửa tài khoản thành công");
        }

        // POST: api/UserAccounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAccount>> PostUserAccount([FromBody] UserAccountDTO userAccountDTO)
        {
            var userAccount = _mapper.Map<UserAccount>(userAccountDTO);
            if (_context.UserAccounts == null)
            {
                return Problem("Dữ liệu rỗng");
            }
            _context.UserAccounts.Add(userAccount);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UserAccountExists(userAccount.EmployeeId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("Thông tin tài khoản:", new { id = userAccount.EmployeeId }, userAccount);
        }

        // DELETE: api/UserAccounts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserAccount(int id)
        {
            if (_context.UserAccounts == null)
            {
                return NotFound();
            }
            var userAccount = await _context.UserAccounts.FindAsync(id);
            if (userAccount == null)
            {
                return NotFound("Không tìm thấy dữ liệu");
            }

            _context.UserAccounts.Remove(userAccount);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserAccountExists(int id)
        {
            return (_context.UserAccounts?.Any(e => e.EmployeeId == id)).GetValueOrDefault();
        }


    }
}
