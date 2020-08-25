using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Enums
{
    public class TransectionType
    {
        enum Months
        {
            Alloted,           // 0 Credited
            Done,              // 1 Debited
            Advanced,          // 2 Debited
            Sent,              // 3 Debited
            Received           // 4 Credited
        }
    }
}