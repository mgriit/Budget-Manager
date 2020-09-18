using Budget_Manager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface IUserRepo
    {
        User FindUser(string userName, string password);
        User FindUser(Int64 userId);
    }
}
