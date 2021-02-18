using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface IReportRepo
    {
        Task<IEnumerable<TransactionFull>> GetTransReport(Int64 codeID, Int64 fiscalYearId, int transactionTypeId,string accountType);
        Task<IEnumerable<CodeSummary>> GetSummaryReport(long fiscalYearId);
    }
}
