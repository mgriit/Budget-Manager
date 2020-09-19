using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;

namespace Budget_Manager.Controllers.api
{
    [Authorize(Roles ="Admin")]
    public class UserController : ApiController
    {
        private readonly IUserRepo _repo;
        public UserController(IUserRepo repo)
        {
            _repo = repo;
        }

        public IHttpActionResult Get(int page, int itemsPerPage, string search, string sortBy, bool reverse)
        {
            IList<User> users = null;
            users = _repo.GetAll(page, itemsPerPage, search, sortBy, reverse);
            if (users.Count == 0)
            {
                return NotFound();
            }
            return Ok(users);
        }
        public IHttpActionResult Get(Int64 userId)
        {
            User user = null;
            user = _repo.FindUser(userId);
            return Ok(user);
        }

        public IHttpActionResult Post(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            user.Creator = Convert.ToInt64(userId);

            int retVal = _repo.Save(user);

            if (retVal==0)
            {
                return BadRequest("Username is already exist!");
            }

            return Ok();
        }

        public IHttpActionResult Delete(Int64 userId)
        {
            _repo.Delete(userId);
            return Ok();
        }
    }
}
