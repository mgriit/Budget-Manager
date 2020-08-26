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
    public class ReportController : ApiController
    {
        private readonly IReportRepo _repo;
        public ReportController(IReportRepo repo)
        {
            _repo = repo;
        }

        [Route("api/report/trans")]
        public IHttpActionResult GetAll( Int64 fiscalYearId, Int64 codeID=0, int transactionTypeId=0)
        {
            IList<TransactionFull> trans = null;
            trans = _repo.GetTransReport(codeID, fiscalYearId, transactionTypeId);
            return Ok(trans);
        }
    }
}
