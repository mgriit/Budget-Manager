using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
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
    public class MyProfileController : ApiController
    {
        private readonly IUserRepo _repo;
        public MyProfileController(IUserRepo repo)
        {
            _repo = repo;
        }

        [Authorize]
        public async Task<IHttpActionResult> GetMyProfile()
        {
            User user = null;

            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            user = await _repo.FindUser(Convert.ToInt64(userId));
            return Ok(user);
        }
        [Authorize]
        public async Task<IHttpActionResult> PostProfile(User user)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            int retVal = await _repo.UpdateProfile(user);
            return Ok();
        }
    }
}
