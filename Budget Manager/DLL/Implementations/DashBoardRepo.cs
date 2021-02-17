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
    public class DashBoardRepo : IDashBoardRepo
    {
        public async Task<IEnumerable<Balance>> GetBalSummary()
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                string sql = "dbo.spDashBoard_AlotvsSpend";
                var bal = await cnn.QueryAsync<Balance>(sql, p, commandType: CommandType.StoredProcedure);
                return bal;
            }
        }
    }
}