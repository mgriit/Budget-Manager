﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Entities
{
    public class FiscalYear
    {
        public Int64 FiscalYearId { get; set; }
        public string FiscalYearName { get; set; }
        public DateTime? DateCreated { get; set; }
        public DateTime? DateModified { get; set; }
        public Int64? Creator { get; set; }
        public Int64? Modifier { get; set; }
    }
}