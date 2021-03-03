using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using management_system.Models;

namespace management_system.Controllers
{
    [Route("api/tables")]
    [ApiController]
    public class TableController : ControllerBase
    {
        // GET method - retrieve tables from .csv
        [HttpGet]
        public ActionResult<IEnumerable<Table>> GetTables()
        {
            return Ok(TableData.GetTables().ToArray());
        }

        // POST method - write tables to .csv
        [HttpPost]
        public ActionResult PostTables([FromBody] Table table)
        {
            TableData.AddTableToCsv(table);
            return Ok();
        }

        // DELETE method - remove tables from .csv
        [HttpDelete("{tableNo}")]
        public ActionResult DeleteTable(int tableNo)
        {
            TableData.DeleteTable(tableNo);
            return Ok();
        }

        // PUT method - update existing tables in .csv
        [HttpPut("{tableNo}")]
        public ActionResult EditTable([FromBody] Table table)
        {
            int tableNum = table.TableNo;
            TableData.UpdateTable(tableNum, table);
            return Ok();
        }
    }
}