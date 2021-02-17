using static Budget_Manager.Helpers.DbConnection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Budget_Manager.Entities;
using Dapper;
using Budget_Manager.ViewModels;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Implementations
{
    public class CodeRepo : ICodeRepo
    {

        public async Task<IEnumerable<Code>> GetAllCode(int page, int itemsPerPage, string search, string sortBy,bool reverse)
        {

            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@page", page);
                p.Add("@search", search);
                p.Add("@sortBy", sortBy);
                p.Add("@itemsPerPage", itemsPerPage);
                p.Add("@sortOrder", reverse ? "DESC" : "ASC");
                string sql = "dbo.spCode_GetAll";
                var codes =await cnn.QueryAsync<Code>(sql,p, commandType: CommandType.StoredProcedure);
                return codes;
            }
     
        }

        public async Task<Code> GetCode(Int64 codeId)
        {

            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@CodeId", codeId); 
                string sql = "dbo.spCode_Get";
                var code =await cnn.QueryAsync<Code>(sql, p, commandType: CommandType.StoredProcedure);
                return code.FirstOrDefault();
            }

        }

        public async Task<bool> SaveCode(Code code)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                var p = new DynamicParameters();
                p.Add("@CodeName", code.CodeName);
                p.Add("@CodeNumber", code.CodeNumber);
                p.Add("@SerialNo", code.SerialNo);
             

                if (code.CodeId == 0)
                {
                    p.Add("@DateCreated", DateTime.Now);
                    p.Add("@Creator", code.Creator);
                    string sql = "dbo.spCode_AddNew";
                    rowsAffected =await cnn.ExecuteAsync(sql, p, commandType: CommandType.StoredProcedure);
                }
                else 
                {
                    p.Add("@CodeId", code.CodeId);
                    p.Add("@DateModified", DateTime.Now);
                    p.Add("@Modifier", code.Creator);
                    string sql = "dbo.spCode_Update";
                    rowsAffected = await cnn.ExecuteAsync(sql, p, commandType: CommandType.StoredProcedure);
                }
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
            
        }

        public async Task<bool> DeleteCode(long codeId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                var p = new DynamicParameters();
                p.Add("@CodeId", codeId);
                string sql = "dbo.spCode_Delete";
                rowsAffected =await cnn.ExecuteAsync(sql, p, commandType: CommandType.StoredProcedure);
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }

        }

        public async Task<IEnumerable<Item>> GetCodeShort()
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                string sql = "[dbo].[spCode_GetAll_Short]";
                var items =await cnn.QueryAsync<Item>(sql, commandType: CommandType.StoredProcedure);
                return items;
            }
        }
    }
}