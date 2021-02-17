using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface IMenuRepo
    {
        Task<IEnumerable<Menu>> GetAllMenus(int page, int itemsPerPage, string search, string sortBy, bool reverse);
        Task<IEnumerable<Menu>> GetPermittedMenus(Int64 userId);
        Task<Menu> GetMenu(int id);
        Task<IEnumerable<Menu>> GetMenusForRole(int roleId);
        Task SetMenuForRole(RoleMenuPermission rmp);
    }
}
