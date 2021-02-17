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
        Task<IEnumerable<TransactionFull>> GetAllTransaction(int page, int itemsPerPage, string search, string sortBy, bool reverse, Int64 codeID, Int64 fiscalYearId, int transactionTypeId);
        Task<bool> SaveTransaction(Transaction transaction);
        Task<TransactionFull> GetTransaction(Int64 transactionId);
        Task<bool> DeleteTransaction(long transactionId);
 
    }
}
