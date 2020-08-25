using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.ViewModels
{
    public class TransactionFull
    {
        public Int64 TransactionId { get; set; }
        public DateTime TransactionDate { get; set; }
        public decimal TransactionAmount { get; set; }
        public decimal TotalAmount { get; set; }
        public string TransactionNote { get; set; }
        public Int64? TransferedFrom { get; set; }
        public Int64? TransferedTo { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Int64? Creator { get; set; }
        public Int64? Modifier { get; set; }
        //Code
        public Int64 CodeId { get; set; }
        public String CodeName { get; set; }
        public String CodeNumber { get; set; }
        //Fiscal Year
        public Int64 FiscalYearId { get; set; }
        public string FiscalYearName { get; set; }
        //Transaction Type
        public int TransactionTypeId { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }

        public int? TotalRow { get; set; }
    }
}