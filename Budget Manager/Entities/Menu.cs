using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.Entities
{
    public class Menu
    {
        public int MenuId { get; set; }
        public string MenuText { get; set; }
        public string MenuLink { get; set; }
        public string MenuIcon { get; set; }
        public int SerialNo { get; set; }
        public bool IsSelected { get; set; }
        public int TotalRow { get; set; }
    }
}