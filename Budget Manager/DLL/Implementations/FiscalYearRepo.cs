using static Budget_Manager.Helpers.DbConnection;
using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Dapper;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Implementations
{
    public class FiscalYearRepo : IFiscalYearRepo
    {
        public async Task<IEnumerable<Item>> GetFiscalYearShort()
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                string sql = "[dbo].[spFiscalYear_GetAll_Short]";
                var items =await cnn.QueryAsync<Item>(sql, commandType: CommandType.StoredProcedure);
                return items;
            }
        }
    }
}