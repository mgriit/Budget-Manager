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
    public class UserController : ApiController
    {
        private readonly IUserRepo _repo;
        public UserController(IUserRepo repo)
        {
            _repo = repo;
        }
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IHttpActionResult> Get(int page, int itemsPerPage, string search, string sortBy, bool reverse)
        {
            IEnumerable<User> users = null;
            users = await _repo.GetAll(page, itemsPerPage, search, sortBy, reverse);
            if (users.Count() == 0)
            {
                return NotFound();
            }
            return Ok(users);
        }
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IHttpActionResult> Get(Int64 userId)
        {
            User user = null;
            user =await _repo.FindUser(userId);
            return Ok(user);
        }

        [HttpGet]
        [Route("api/user/role")]
        public async Task<IHttpActionResult> GetRoles()
        {
            IEnumerable<Item> items = null;
            items = await _repo.GetRoles();

            if (items.Count() == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IHttpActionResult> Post(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            user.Creator = Convert.ToInt64(userId);

            int retVal =await _repo.Save(user);

            if (retVal==0)
            {
                return BadRequest("Username is already exist!");
            }

            return Ok();
        }
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IHttpActionResult> Delete(Int64 userId)
        {
            await _repo.Delete(userId);
            return Ok();
        }
    }
}
