using Budget_Manager.DLL.Interfaces;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Budget_Manager.Controllers.api
{
    public class RoleController : ApiController
    {
        private readonly IRoleRepo _repo;
        public RoleController(IRoleRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/role/short")]
        public async Task<IHttpActionResult> GetCodeShort()
        {
            IEnumerable<Item> items = null;
            items = await _repo.GetRoleShort();

            if (items.Count() == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
    }
}
