using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;

namespace Budget_Manager.Controllers.api
{
    [Authorize]
    public class MenuController : ApiController
    {
        private readonly IMenuRepo _repo;
        public MenuController(IMenuRepo repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetAllMenus(int page, int itemsPerPage, string search, string sortBy, bool reverse)
        {
            IEnumerable<Menu> menus = null;
            menus = await _repo.GetAllMenus(page, itemsPerPage, search, sortBy, reverse);
            if (menus.Count() == 0)
            {
                return NotFound();
            }
            return Ok(menus);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetPermittedMenus()
        {
            IEnumerable<Menu> menus = null;
            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            menus = await _repo.GetPermittedMenus(Convert.ToInt64(userId));

            if (menus.Count() == 0)
            {
                return NotFound();
            }
            return Ok(menus);
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetMenu(int id)
        {
            Menu menu = null;
            menu = await _repo.GetMenu(id);
            return Ok(menu);
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetMenusForRole(int roleId, bool forrole=true)
        {
            IEnumerable<Menu> menus = null;
            menus = await _repo.GetMenusForRole(roleId);
            if (menus.Count() == 0)
            {
                return NotFound();
            }
            return Ok(menus);
        }

        [HttpPost]
        public async Task<IHttpActionResult> PostMenuForRole(RoleMenuPermission rmp)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            rmp.Menus = rmp.Menus.Where(a=>a.IsSelected).ToList();

            if (rmp.Menus.Count < 1)
            {
                return BadRequest("No menu is selected for permission");
            }

            await _repo.SetMenuForRole(rmp);

            return Ok();
        }
    }
}
