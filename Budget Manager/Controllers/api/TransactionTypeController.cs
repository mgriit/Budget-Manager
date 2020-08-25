using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Budget_Manager.Controllers.api
{
    public class TransactionTypeController : ApiController
    {
        private readonly ITransactionTypeRepo _repo;
        public TransactionTypeController(ITransactionTypeRepo repo)
        {
            _repo = repo;
        }

        [Route("api/TransactionType/short")]
        public IHttpActionResult Get()
        {
            IList<Item> items = null;
            items = _repo.GetTransTypeShort();

            if (items.Count == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
    }
}