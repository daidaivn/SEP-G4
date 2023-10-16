using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarpentryWorkshopAPI.Models;
using AutoMapper;

namespace CarpentryWorkshopAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserAccountsController : ControllerBase
    {
        private readonly SEPG4CCMSContext _context;
        private IMapper _mapper;
        private readonly IConfiguration _configuration;
        public UserAccountsController(SEPG4CCMSContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/UserAccounts
        [HttpGet]
        public async Task<ActionResult> GetUserAccounts()
        {
          if (_context.UserAccounts == null)
          {
              return NotFound();
          }
            var userAccount = await _context.UserAccounts
                  .Include(u => u.Employee)
                  .ThenInclude(u => u.RolesEmployees)
                  .ThenInclude(u => u.Role).Select(u=>u.Employee.RolesEmployees.Select(re=>re.Role.RoleName)).ToListAsync();
            return Ok(userAccount);
        }

        // GET: api/UserAccounts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserAccount>> GetUserAccount(int id)
        {
          if (_context.UserAccounts == null)
          {
              return NotFound();
          }
            var userAccount = await _context.UserAccounts.FindAsync(id);

            if (userAccount == null)
            {
                return NotFound();
            }

            return userAccount;
        }

        // PUT: api/UserAccounts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserAccount(int id, UserAccount userAccount)
        {
            if (id != userAccount.EmployeeId)
            {
                return BadRequest();
            }

            _context.Entry(userAccount).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserAccountExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/UserAccounts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<UserAccount>> PostUserAccount(UserAccount userAccount)
        {
          if (_context.UserAccounts == null)
          {
              return Problem("Entity set 'SEPG4CCMSContext.UserAccounts'  is null.");
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

            return CreatedAtAction("GetUserAccount", new { id = userAccount.EmployeeId }, userAccount);
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
                return NotFound();
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
