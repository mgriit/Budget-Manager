using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Budget_Manager.Controllers
{
    public class TransactionController : ApiController
    {
        private readonly ITransactionRepo _repo;
        public TransactionController(ITransactionRepo repo)
        {
            _repo = repo;
        }
        public IHttpActionResult GetAll(int page, int itemsPerPage, string search, string sortBy, bool reverse, Int64 codeID= 0, Int64 fiscalYearId = 0, int transactionTypeId = 0)
        {
            IList<TransactionFull> trans = null;
            trans = _repo.GetAllTransaction(page, itemsPerPage, search, sortBy, reverse, codeID, fiscalYearId, transactionTypeId);
            if (trans.Count == 0)
            {
                return NotFound();
            }
            return Ok(trans);
        }
        public IHttpActionResult Get(Int64 transactionId)
        {
            TransactionFull transaction = null;
            transaction = _repo.GetTransaction(transactionId);
            return Ok(transaction);
        }

        public IHttpActionResult Post(Transaction transaction)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            transaction.Creator = Convert.ToInt64(userId);

            _repo.SaveTransaction(transaction);

            return Ok();
        }

        public IHttpActionResult Delete(Int64 transactionId)
        {
            _repo.DeleteTransaction(transactionId);
            return Ok();
        }
    }
}
