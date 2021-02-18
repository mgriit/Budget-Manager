using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace Budget_Manager.Controllers
{
    [Authorize(Roles ="SuperAdmin,Admin")]
    public class TransactionController : ApiController
    {
        private readonly ITransactionRepo _repo;
        public TransactionController(ITransactionRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetAll(int page, int itemsPerPage, string search, string sortBy, bool reverse, Int64 codeID= 0, Int64 fiscalYearId = 0, int transactionTypeId = 0)
        {
            IEnumerable<TransactionFull> trans = null;
            trans = await _repo.GetAllTransaction(page, itemsPerPage, search, sortBy, reverse, codeID, fiscalYearId, transactionTypeId);
            if (trans.Count() == 0)
            {
                return NotFound();
            }
            return Ok(trans);
        }

        [HttpGet]
        public async Task<IHttpActionResult> Get(Int64 transactionId)
        {
            TransactionFull transaction = null;
            transaction =await _repo.GetTransaction(transactionId);
            return Ok(transaction);
        }

        public async Task<IHttpActionResult> Post(Transaction transaction)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            transaction.Creator = Convert.ToInt64(userId);

            await _repo.SaveTransaction(transaction);

            return Ok();
        }

        public async Task<IHttpActionResult> Delete(Int64 transactionId)
        {
            await _repo.DeleteTransaction(transactionId);
            return Ok();
        }
    }
}
