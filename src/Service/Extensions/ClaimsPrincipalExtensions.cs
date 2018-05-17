namespace Linn.Projects.Service.Extensions
{
    using System;
    using System.Linq;
    using System.Security.Claims;

    public static class ClaimsPrincipalExtensions
    {
        public static string GetEmployeeUrl(this ClaimsPrincipal principal)
        {
            return principal?.Claims
                .FirstOrDefault(claim => claim.Type.Equals("employee", StringComparison.InvariantCultureIgnoreCase))
                ?.Value;
        }

        public static bool HasClaim(this ClaimsPrincipal principal, string type)
        {
            if (type == null)
            {
                throw new ArgumentNullException(nameof(type));
            }

            return principal.Identities.Any(identity => identity.HasClaim(type));
        }
    }
}
