using Budget_Manager.DLL.Implementations;
using Budget_Manager.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Budget_Manager.Controllers.api
{
    public class CodeController : ApiController
    {
        private readonly ICodeRepo _repo;
        public CodeController(ICodeRepo repo)
        {
            _repo = repo;
        }

        public IHttpActionResult GetAllCodes()
        {
            IList<Code> codes = null;
            codes = _repo.GetAllCode();
            if (codes.Count == 0)
            {
                return NotFound();
            }
            return Ok(codes);
        }
        public IHttpActionResult PostNewCode(Code code)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            _repo.SaveCode(code);

            return Ok();
        }


    }
}
