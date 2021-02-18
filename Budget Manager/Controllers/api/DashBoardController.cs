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
    [Authorize]
    public class DashBoardController : ApiController
    {
        private readonly IDashBoardRepo _repo;
        private readonly IReportRepo _reportRepo;
        public DashBoardController(IDashBoardRepo repo, IReportRepo reportRepo)
        {
            _repo = repo;
            _reportRepo = reportRepo;
        }

        [Route("api/dashboard/one")]
        public async Task<IHttpActionResult> Get()
        {
            IEnumerable<Balance> bal = null;
            bal =await _repo.GetBalSummary();
            return Ok(bal);
        }

        [Route("api/dashboard/two")]
        public async Task<IHttpActionResult> Get(Int64 fiscalYearId)
        {
            IEnumerable<CodeSummary> codeSum = null;
            codeSum = await _reportRepo.GetSummaryReport(fiscalYearId);
            return Ok(codeSum);
        }
    }
}
