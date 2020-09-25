using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using static Budget_Manager.Helpers.DbConnection;

namespace Budget_Manager.DLL.Implementations
{
    public class ReportRepo : IReportRepo
    {
        public IList<CodeSummary> GetSummaryReport(long fiscalYearId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@FiscalYearId", fiscalYearId);
                string sql = "dbo.spSummaryReport";
                var codeSum = cnn.Query<CodeSummary>(sql, p, commandType: CommandType.StoredProcedure).ToList();
                return codeSum;
            }
        }

        public IList<TransactionFull> GetTransReport(Int64 codeID, Int64 fiscalYearId, int transactionTypeId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@CodeID", codeID);
                p.Add("@FiscalYearId", fiscalYearId);
                p.Add("@TransactionTypeId", transactionTypeId);
              
                string sql = "dbo.spTransReport";
                var trans = cnn.Query<TransactionFull>(sql, p, commandType: CommandType.StoredProcedure).ToList();
                return trans;
            }
        }
    }
}