using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using management_system.Models;

namespace management_system.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        // GET method - retrieve accounts from .csv
        [HttpGet]
        public ActionResult<IEnumerable<Account>> GetUsers()
        {
            return Ok(AccountData.GetUsers().ToArray());
        }

        // POST method - write accounts to .csv
        [HttpPost]
        public ActionResult PostUsers([FromBody] Account account)
        {
            AccountData.AddAccountToCsv(account);
            return Ok();
        }
    }
}