﻿using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Budget_Manager.DLL.Interfaces
{
    public interface ITransactionTypeRepo
    {
        IList<Item> GetTransTypeShort();
    }
}
