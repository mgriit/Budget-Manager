using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Entities
{
    public class Transaction
    {
        public Int64 TransactionId { get; set; }
        public Int64 CodeId { get; set; }
        public Int64 FiscalYearId { get; set; }
        public int TransactionTypeId { get; set; }
        public DateTime? TransactionDate { get; set; }
        public decimal TransactionAmount { get; set; }
        public string TransactionNote { get; set; }
        public Int64? TransferedFrom { get; set; }
        public Int64? TransferedTo { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Int64? Creator { get; set; }
        public Int64? Modifier { get; set; }
    }
}