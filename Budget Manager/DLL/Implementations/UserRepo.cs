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
    public class UserRepo : IUserRepo
    {
        public User FindUser(string userName, string password)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@Username", userName);
                p.Add("@Password", password);
                string sql = "dbo.spUser_GetbyUsername";
                var user = cnn.Query<User>(sql, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return user;
            }
        }

        public User FindUser(long userId)
        {
            throw new NotImplementedException();
        }
    }
}