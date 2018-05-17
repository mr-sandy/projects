namespace Linn.Projects.Service.Extensions
{
    using System.Linq;
    using System.Threading.Tasks;
    using Carter;

    public static class CarterModuleExtensions
    {
        public static void RequiresClaims(this CarterModule module, params string[] claimTypes)
        {
            module.RequiresAuthentication();

            module.Before += context =>
            {
                var validClaims = context.User != null && claimTypes.All(type => context.User.HasClaim(type));

                if (!validClaims)
                {
                    context.Response.StatusCode = 401;
                }

                return Task.FromResult(validClaims);
            };
        }
        public static void RequiresEmployeeClaim(this CarterModule module) => module.RequiresClaims("employee");
    }
}