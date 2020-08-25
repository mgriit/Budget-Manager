using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        [Route("api/FiscalYear/short")]
        public IHttpActionResult Get()
        {
            IList<Item> items = null;
            items = _repo.GetFiscalYearShort();

            if (items.Count == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
    }
}
