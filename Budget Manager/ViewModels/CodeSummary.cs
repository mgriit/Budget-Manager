using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.ViewModels
{
    public class CodeSummary
    {
        public Int64 CodeId { get; set; }
        public String CodeName { get; set; }
        public String CodeNumber { get; set; }
        public decimal Total { get; set; }
        public decimal Expense { get; set; }
        public decimal Balance { get; set; }
    }
}