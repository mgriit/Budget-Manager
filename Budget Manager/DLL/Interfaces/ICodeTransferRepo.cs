using Budget_Manager.DLL.Implementations;
using Budget_Manager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface ICodeTransferRepo
    {
        int SaveCodeTransfer(Codetransfer codeTransfer);
    }
}
