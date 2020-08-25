using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Implementations
{
    public interface ICodeRepo
    {
        IList<Code> GetAllCode(int page, int itemsPerPage, string search, string sortBy,bool reverse);
        bool SaveCode(Code code);
        Code GetCode(Int64 codeId);
        bool DeleteCode(long codeId);
        IList<Item> GetCodeShort();
    }
}
