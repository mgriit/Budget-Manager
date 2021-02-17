using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
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
    public class MenuRepo : IMenuRepo
    {
        public async Task<IEnumerable<Menu>> GetAllMenus(int page, int itemsPerPage, string search, string sortBy, bool reverse)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@page", page);
                p.Add("@search", search);
                p.Add("@sortBy", sortBy);
                p.Add("@itemsPerPage", itemsPerPage);
                p.Add("@sortOrder", reverse ? "DESC" : "ASC");
                string sql = "dbo.spMenu_GetAll";
                var data = await cnn.QueryAsync<Menu>(sql, p, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<Menu> GetMenu(int id)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@MenuId", id);
                string sql = "dbo.spMenu_Get";
                var data = await cnn.QueryAsync<Menu>(sql, p, commandType: CommandType.StoredProcedure);
                return data.FirstOrDefault();
            }
        }

        public async Task<IEnumerable<Menu>> GetMenusForRole(int id)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@RoleId", id);
                
                string sql = "dbo.[spMenu_GetForRole]";
                var data = await cnn.QueryAsync<Menu>(sql, p, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task<IEnumerable<Menu>> GetPermittedMenus(Int64 userId)
        {
            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@UserId", userId);
                string sql = "dbo.[spMenu_GetPermitted]";
                var data = await cnn.QueryAsync<Menu>(sql, p, commandType: CommandType.StoredProcedure);
                return data;
            }
        }

        public async Task SetMenuForRole(RoleMenuPermission rmp)
        {
            DataTable table = new DataTable();
            table.Columns.Add("RoleId", typeof(int));
            table.Columns.Add("MenuId", typeof(int));
            DataRow row;
 

            foreach (var item in rmp.Menus)
            {
                row = table.NewRow();
                row["RoleId"] = rmp.RoleId;
                row["MenuId"] = item.MenuId;
                table.Rows.Add(row);
            }

            using (IDbConnection cnn = new SqlConnection(GetConnectionString()))
            {
                var p = new DynamicParameters();
                p.Add("@RoleId", rmp.RoleId);
                p.AddDynamicParams(new{ Menus = table.AsTableValuedParameter("dbo.[MenuListForRole]") });
                string sql = "dbo.[spRole_AddMenu]";
                await cnn.ExecuteAsync(sql, p, commandType: CommandType.StoredProcedure);
            }
        }
    }
}