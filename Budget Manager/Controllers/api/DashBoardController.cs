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
        private readonly IReportRepo _reportRepo;
        public DashBoardController(IDashBoardRepo repo, IReportRepo reportRepo)
        {
            _repo = repo;
            _reportRepo = reportRepo;
        }

        [Route("api/dashboard/one")]
        public IHttpActionResult Get()
        {
            IList<Balance> bal = null;
            bal = _repo.GetBalSummary();
            return Ok(bal);
        }

        [Route("api/dashboard/two")]
        public IHttpActionResult Get(Int64 fiscalYearId)
        {
            IList<CodeSummary> codeSum = null;
            codeSum = _reportRepo.GetSummaryReport(fiscalYearId);
            return Ok(codeSum);
        }
    }
}
