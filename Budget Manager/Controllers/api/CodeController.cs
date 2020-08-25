using Budget_Manager.DLL.Implementations;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
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

        public IHttpActionResult GetCodes(int page, int itemsPerPage,string search,string sortBy, bool reverse)
        {
            IList<Code> codes = null;
            codes = _repo.GetAllCode(page, itemsPerPage, search, sortBy,reverse);
            if (codes.Count == 0)
            {
                return NotFound();
            }
            return Ok(codes);
        }
        public IHttpActionResult GetCode(Int64 codeId)
        {
            Code codes = null;
            codes = _repo.GetCode(codeId);
            return Ok(codes);
        }
        [Route("api/code/short")]
        public IHttpActionResult GetCodeShort()
        {
            IList<Item> items = null;
            items = _repo.GetCodeShort();

            if (items.Count == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
        public IHttpActionResult PostNewCode(Code code)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            _repo.SaveCode(code);

            return Ok();
        }

        public IHttpActionResult DeleteCodes(Int64 codeId)
        {
            _repo.DeleteCode(codeId);
            return Ok();
        }
    }
}
