using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static Budget_Manager.Helpers.DbConnection;

namespace Budget_Manager.DLL.Implementations
{
    public class ReportRepo : IReportRepo
    {
        public async Task<IEnumerable<CodeSummary>> GetSummaryReport(long fiscalYearId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@FiscalYearId", fiscalYearId);
                string sql = "dbo.spSummaryReport";
                var codeSum =await cnn.QueryAsync<CodeSummary>(sql, p, commandType: CommandType.StoredProcedure);
                return codeSum;
            }
        }

        public async Task<IEnumerable<TransactionFull>> GetTransReport(Int64 codeID, Int64 fiscalYearId, int transactionTypeId,string accountType)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@CodeID", codeID);
                p.Add("@FiscalYearId", fiscalYearId);
                p.Add("@TransactionTypeId", transactionTypeId);
                p.Add("@AccountType", accountType);
              
                string sql = "dbo.spTransReport";
                var trans =await cnn.QueryAsync<TransactionFull>(sql, p, commandType: CommandType.StoredProcedure);
                return trans;
            }
        }
    }
}