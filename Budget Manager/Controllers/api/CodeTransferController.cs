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
    public class CodeTransferController : ApiController
    {
        private readonly ICodeTransferRepo _repo;
        public CodeTransferController(ICodeTransferRepo repo)
        {
            _repo = repo;
        }
        [HttpPost]
        public IHttpActionResult Post(Codetransfer codetransfer)
        {
            if (!ModelState.IsValid)
                return BadRequest("You inserted invalid data!");

            var identity = (ClaimsIdentity)User.Identity;

            String userId = identity.Claims
                 .Where(c => c.Type == "UserId")
                 .Select(c => c.Value).FirstOrDefault();

            codetransfer.Creator = Convert.ToInt64(userId);

            int retVal = _repo.SaveCodeTransfer(codetransfer);

            if(retVal==1)
                return Ok();
            else
                return BadRequest("Transfered amount is not valid!");
        }
    }
}
