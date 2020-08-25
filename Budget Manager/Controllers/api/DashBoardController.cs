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
    public class DashBoardController : ApiController
    {
        private readonly IDashBoardRepo _repo;
        public DashBoardController(IDashBoardRepo repo)
        {
            _repo = repo;
        }

        [Route("api/dashboard/one")]
        public IHttpActionResult Get()
        {
            IList<Balance> bal = null;
            bal = _repo.GetBalSummary();
            return Ok(bal);
        }
    }
}
