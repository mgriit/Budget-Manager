using static Budget_Manager.Helpers.DbConnection;
using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace Budget_Manager.DLL.Implementations
{
    public class TransactionTypeRepo : ITransactionTypeRepo
    {
        public IList<Item> GetTransTypeShort()
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                string sql = "[dbo].[spTransactionType_GetAll_Short]";
                var items = cnn.Query<Item>(sql, commandType: CommandType.StoredProcedure).ToList();
                return items;
            }
        }
    }
}
