using Budget_Manager.DLL.Implementations;
using Budget_Manager.DLL.Interfaces;
using Budget_Manager.Entities;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace Budget_Manager
{
    public class MyAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated(); 
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {                        
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);

            UserRepo _repo = new UserRepo();
            User user=_repo.FindUser(context.UserName, context.Password);
            
            if (user == null)
            {              
                context.SetError("invalid_grant", "The Username or Password is incorrect.");
                return;  
            }

            identity.AddClaim(new Claim("UserId", user.UserId.ToString()));
            identity.AddClaim(new Claim(ClaimTypes.Name, user.UserFullName));
            identity.AddClaim(new Claim(ClaimTypes.Role, user.IsAdmin ? "Admin":"User"));
            context.Validated(identity);
        }
    }
}
