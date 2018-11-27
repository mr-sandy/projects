//namespace Linn.Projects.Service.Modules
//{
//    using System.Threading.Tasks;
//    using Carter;
//    using Carter.Response;
//    using Microsoft.AspNetCore.Http;
//    using Microsoft.AspNetCore.Routing;

//    public class TempModule : CarterModule
//    {
//        public TempModule()
//        {
//            this.Get("/", this.GetProjects);
//            this.Get("/projects", this.GetProjects);
//            this.Get("/projects/{id:int}", this.GetProjects);
//            this.Get("/projects/projects", this.GetProjects);
//            this.Get("/projects/projects/{id:int}", this.GetProjects);
//            this.Get("{*url}", this.GetProjects);
//        }

//        private async Task GetProjects(HttpRequest req, HttpResponse res, RouteData routeData)
//        {
//            await res.Negotiate(new
//            {
//                Name = "Sandy",
//                Path = req.Path.ToString()
//            });
//        }
//    }
//}