using Budget_Manager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Budget_Manager.ViewModels
{
    public class RoleMenuPermission
    {
        public int RoleId { get; set; }
        public List<Menu> Menus { get; set; }

    }
}