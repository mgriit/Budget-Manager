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
    public class RoleRepo : IRoleRepo
    {
        public async Task<IEnumerable<Item>> GetRoleShort()
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                string sql = "[dbo].[spRole_GetAll_Short]";
                var items = await cnn.QueryAsync<Item>(sql, commandType: CommandType.StoredProcedure);
                return items;
            }
        }
    }
}