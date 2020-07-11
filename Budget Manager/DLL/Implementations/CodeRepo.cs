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
        public IList<Code> GetAllCode()
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                string sql = "dbo.spCode_GetAll";
                var codes = cnn.Query<Code>(sql,commandType: CommandType.StoredProcedure).ToList();
                return codes;
            }
     
        }

        public bool SaveCode(Code code)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                int rowsAffected;
                if (code.CodeId == 0)
                {
                    string sql = "dbo.spCode_AddNew";
                    rowsAffected = cnn.Execute(sql, code);
                }
                else 
                {
                    string sql = "dbo.spCode_AddNew";
                    rowsAffected = cnn.Execute(sql, code);
                }
                if (rowsAffected > 0)
                {
                    return true;
                }
                return false;
            }
            
        }
    }
}