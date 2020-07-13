using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Entities
{
    public class Code
    {
        public Int64 CodeId { get; set; }
        public String CodeName { get; set; }
        public String CodeNumber { get; set; }
        public int? SerialNo { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Int64? Creator { get; set; }
        public Int64? Modifier { get; set; }
        public int? TotalRow { get; set; }
    }
}