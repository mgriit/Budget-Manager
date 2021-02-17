using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Budget_Manager.Controllers.api
{
    public class FiscalYearController : ApiController
    {
        private readonly IFiscalYearRepo _repo;
        public FiscalYearController(IFiscalYearRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        [Route("api/FiscalYear/short")]
        public async Task<IHttpActionResult> Get()
        {
            IEnumerable<Item> items = null;
            items = await _repo.GetFiscalYearShort();

            if (items.Count() == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
    }
}
