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
        Task<IEnumerable<Code>> GetAllCode(int page, int itemsPerPage, string search, string sortBy,bool reverse);
        Task<bool> SaveCode(Code code);
        Task<Code> GetCode(Int64 codeId);
        Task<bool> DeleteCode(long codeId);
        Task<IEnumerable<Item>> GetCodeShort();
    }
}
