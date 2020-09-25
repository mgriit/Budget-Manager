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
        public IHttpActionResult Get( Int64 fiscalYearId, Int64 codeID=0, int transactionTypeId=0)
        {
            IList<TransactionFull> trans = null;
            trans = _repo.GetTransReport(codeID, fiscalYearId, transactionTypeId);
            return Ok(trans);
        }

        [Route("api/report/summary")]
        public IHttpActionResult Get(Int64 fiscalYearId)
        {
            IList<CodeSummary> codeSum = null;
            codeSum = _repo.GetSummaryReport(fiscalYearId);
            Decimal TotalAllotment = codeSum.Sum(x => x.Total);
            Decimal TotalExpense = codeSum.Sum(x => x.Expense);
            Decimal TotalBalance = codeSum.Sum(x => x.Balance);
            return Ok(new { CodeSum=codeSum, TotalAllotment = TotalAllotment,TotalExpense=TotalExpense,TotalBalance=TotalBalance});
        }
    }
}
