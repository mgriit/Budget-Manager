using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Entities
{
    public class TransactionType
    {
        public int TransactionTypeId { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
    }
}