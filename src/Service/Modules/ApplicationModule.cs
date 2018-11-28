namespace Linn.Projects.Service.Modules
{
    using System.Threading.Tasks;
    using Carter;
    using Carter.Response;
    using Linn.Projects.Service.Extensions;
    using Linn.Projects.Service.Models;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Routing;

    public class ApplicationModule : CarterModule
    {
        public ApplicationModule()
        {
            this.Get("/", this.Redirect);
            this.Get("/projects/signin-oidc-client", this.GetApp);
            this.Get("/projects/signin-oidc-silent", this.GetSilentRenew);

            //            this.RequiresEmployeeClaim();
        }

        private Task Redirect(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            res.Redirect("/projects");
            return Task.CompletedTask;
        }

        private async Task GetApp(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            await res.Negotiate(new ViewResponse { ViewName = "Index.html" });
        }

        private async Task GetSilentRenew(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            await res.Negotiate(new ViewResponse { ViewName = "SilentRenew.html" });
        }
    }
}