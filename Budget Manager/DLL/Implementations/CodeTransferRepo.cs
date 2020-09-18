using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
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
    public class CodeTransferRepo : ICodeTransferRepo
    {
        public int SaveCodeTransfer(Codetransfer codeTransfer)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                
                var p = new DynamicParameters();
                p.Add("@SentCodeID", codeTransfer.SentCodeId);
                p.Add("@ReceivedCodeID", codeTransfer.ReceivedCodeId);
                p.Add("@FiscalYearId", codeTransfer.FiscalYearId);
                p.Add("@TransactionAmount", codeTransfer.TransactionAmount);
                p.Add("@TransactionNote", codeTransfer.TransactionNote);
                p.Add("@TransactionDate", DateTime.Now);
                p.Add("@DateCreated", DateTime.Now);
                p.Add("@Creator", codeTransfer.Creator);
                p.Add("@flag", DbType.Int32, direction: ParameterDirection.Output);
                string sql = "dbo.spTransaction_CodeTransfer";
                cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                int retVal = p.Get<int>("flag");
                return retVal;
            }
        }
    }
}