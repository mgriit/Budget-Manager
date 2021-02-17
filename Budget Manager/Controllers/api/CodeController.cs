using Budget_Manager.DLL.Implementations;
using Budget_Manager.Entities;
using Budget_Manager.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
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
        [HttpGet]
        public async Task<IHttpActionResult> GetCodes(int page, int itemsPerPage,string search,string sortBy, bool reverse)
        {
            IEnumerable<Code> codes = null;
            codes = await _repo.GetAllCode(page, itemsPerPage, search, sortBy,reverse);
            if (codes.Count() == 0)
            {
                return NotFound();
            }
            return Ok(codes);
        }
        [HttpGet]
        public async Task<IHttpActionResult> GetCode(Int64 codeId)
        {
            Code codes = null;
            codes =await _repo.GetCode(codeId);
            return Ok(codes);
        }
        [HttpGet]
        [Route("api/code/short")]
        public async Task<IHttpActionResult> GetCodeShort()
        {
            IEnumerable<Item> items = null;
            items =await _repo.GetCodeShort();

            if (items.Count() == 0)
            {
                return NotFound();
            }
            return Ok(items);
        }
        [HttpPost]
        public async Task<IHttpActionResult> PostNewCode(Code code)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid data.");

            var identity = (ClaimsIdentity)User.Identity;
            String userId = identity.Claims
             .Where(c => c.Type == "UserId")
             .Select(c => c.Value).FirstOrDefault();

            code.Creator = Convert.ToInt64(userId);

            await _repo.SaveCode(code);

            return Ok();
        }
        [HttpDelete]
        public async Task<IHttpActionResult> DeleteCodes(Int64 codeId)
        {
            await _repo.DeleteCode(codeId);
            return Ok();
        }
    }
}
