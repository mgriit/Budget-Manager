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
        public bool Delete(long userId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                var p = new DynamicParameters();
                p.Add("@UserId", userId);
                string sql = "dbo.spUser_Delete";
                rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
        }

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
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", userId);
                string sql = "dbo.spUser_Get";
                var user = cnn.Query<User>(sql, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return user;
            }
        }

        public IList<User> GetAll(int page, int itemsPerPage, string search, string sortBy, bool reverse)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@page", page);
                p.Add("@search", search);
                p.Add("@sortBy", sortBy);
                p.Add("@itemsPerPage", itemsPerPage);
                p.Add("@sortOrder", reverse ? "DESC" : "ASC");
                string sql = "dbo.spUser_GetAll";
                var uses = cnn.Query<User>(sql, p, commandType: CommandType.StoredProcedure).ToList();
                return uses;
            }
        }

        public int Save(User user)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {

                var p = new DynamicParameters();
                p.Add("@Username", user.Username);
                p.Add("@UserFullName", user.UserFullName);
                p.Add("@Password", user.Password);
                p.Add("@Designation", user.Designation);
                p.Add("@IsAdmin", user.IsAdmin);
                p.Add("@flag", DbType.Int32, direction: ParameterDirection.Output);


                if (user.UserId == 0)
                {
                    p.Add("@DateCreated", DateTime.Now);
                    p.Add("@Creator", user.Creator);
                    string sql = "dbo.spUser_AddNew";
                    cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                    int retVal = p.Get<int>("flag");
                    return retVal;
                }
                else
                {
                    p.Add("@UserId", user.UserId);
                    p.Add("@DateModified", DateTime.Now);
                    p.Add("@Modifier", user.Creator);
                    string sql = "dbo.spUser_Update";
                    cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                    int retVal = p.Get<int>("flag");
                    return retVal;
                }
            }
        }
    }
}