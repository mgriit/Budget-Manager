using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface ITransactionRepo
    {
        IList<TransactionFull> GetAllTransaction(int page, int itemsPerPage, string search, string sortBy, bool reverse, Int64 codeID, Int64 fiscalYearId, int transactionTypeId);
        bool SaveTransaction(Transaction transaction);
        TransactionFull GetTransaction(Int64 transactionId);
        bool DeleteTransaction(long transactionId);
 
    }
}
