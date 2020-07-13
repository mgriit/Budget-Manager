using static Budget_Manager.Helpers.DbConnection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using Budget_Manager.Entities;
using Dapper;

namespace Budget_Manager.DLL.Implementations
{
    public class CodeRepo : ICodeRepo
    {

        public IList<Code> GetAllCode(int page, int itemsPerPage, string search, string sortBy,bool reverse)
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
                var codes = cnn.Query<Code>(sql,p, commandType: CommandType.StoredProcedure).ToList();
                return codes;
            }
     
        }

        public Code GetCode(Int64 codeId)
        {

            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@CodeId", codeId); 
                string sql = "dbo.spCode_Get";
                var code = cnn.Query<Code>(sql, p, commandType: CommandType.StoredProcedure).FirstOrDefault();
                return code;
            }

        }

        public bool SaveCode(Code code)
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
                    p.Add("@Creator", 1233345557);
                    string sql = "dbo.spCode_AddNew";
                    rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                }
                else 
                {
                    p.Add("@CodeId", code.CodeId);
                    p.Add("@DateModified", DateTime.Now);
                    p.Add("@Modifier", 1233345557);
                    string sql = "dbo.spCode_Update";
                    rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                }
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
            
        }

        public bool DeleteCode(long codeId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                var p = new DynamicParameters();
                p.Add("@CodeId", codeId);
                string sql = "dbo.spCode_Delete";
                rowsAffected = cnn.Execute(sql, p, commandType: CommandType.StoredProcedure);
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }

        }
    }
}