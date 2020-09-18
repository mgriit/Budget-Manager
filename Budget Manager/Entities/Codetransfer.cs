using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Entities
{
    public class Codetransfer
    {
        public Int64 SentCodeId { get; set; }
        public Int64 ReceivedCodeId { get; set; }
        public Int64 FiscalYearId { get; set; }
        public decimal TransactionAmount { get; set; }
        public string TransactionNote { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Int64? Creator { get; set; }
        public Int64? Modifier { get; set; }
    }
}