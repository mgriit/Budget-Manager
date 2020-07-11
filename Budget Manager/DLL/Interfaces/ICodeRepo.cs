using Budget_Manager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Implementations
{
    public interface ICodeRepo
    {
        IList<Code> GetAllCode();
        bool SaveCode(Code code);
    }
}
