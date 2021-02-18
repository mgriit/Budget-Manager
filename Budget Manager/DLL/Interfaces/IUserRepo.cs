using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface IUserRepo
    {
        Task<User> FindUser(string userName, string password);
        Task<User> FindUser(Int64 userId);
        Task<IEnumerable<User>> GetAll(int page, int itemsPerPage, string search, string sortBy, bool reverse);
        Task<bool> Delete(long userId);
        Task<int> Save(User user);
        Task<IEnumerable<Item>> GetRoles();
        Task<int> UpdateProfile(User user);
    }
}
