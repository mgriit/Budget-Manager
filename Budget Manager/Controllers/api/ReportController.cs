﻿using Budget_Manager.DLL.Interfaces;
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
    public class ReportController : ApiController
    {
        private readonly IReportRepo _repo;
        public ReportController(IReportRepo repo)
        {
            _repo = repo;
        }

        [Route("api/report/trans")]
        public async Task<IHttpActionResult> Get( Int64 fiscalYearId, Int64 codeID=0, int transactionTypeId=0)
        {
            IEnumerable<TransactionFull> trans = null;
            Decimal TotalAllotment;
            Decimal TotalExpense;
            Decimal Balance;
            trans =await _repo.GetTransReport(codeID, fiscalYearId, transactionTypeId);
            TotalAllotment = trans.Where(a => a.Type == "Credit").Sum(b=>b.TransactionAmount);
            TotalExpense = trans.Where(a => a.Type == "Debit").Sum(b => b.TransactionAmount);
            Balance = TotalAllotment - TotalExpense;
            return Ok(new { Trans = trans, TotalAllotment = TotalAllotment, TotalExpense = TotalExpense ,Balance=Balance});
        }

        [Route("api/report/summary")]
        public async Task<IHttpActionResult> Get(Int64 fiscalYearId)
        {
            IEnumerable<CodeSummary> codeSum = null;
            codeSum =await _repo.GetSummaryReport(fiscalYearId);
            Decimal TotalAllotment = codeSum.Sum(x => x.Total);
            Decimal TotalExpense = codeSum.Sum(x => x.Expense);
            Decimal TotalBalance = codeSum.Sum(x => x.Balance);
            return Ok(new { CodeSum=codeSum, TotalAllotment = TotalAllotment,TotalExpense=TotalExpense,TotalBalance=TotalBalance});
        }
    }
}
