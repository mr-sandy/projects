namespace Linn.Projects.Service.Modules
{
    using System.Threading.Tasks;
    using Carter;
    using Carter.ModelBinding;
    using Carter.Request;
    using Carter.Response;
    using Linn.Projects.Facade;
    using Linn.Projects.Facade.Resources;
    using Linn.Projects.Service.Extensions;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Routing;

    public class ProjectsModule : CarterModule
    {
        private readonly IProjectsService projectsService;

        public ProjectsModule(IProjectsService projectsService)
        {
            this.projectsService = projectsService;

            this.Get("/projects", this.GetProjects);
            this.Get("/projects/{id:int}", this.GetProject);
            this.Post("/projects", this.PostProject);

            this.RequiresEmployeeClaim();
        }

        private async Task GetProjects(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            var result = this.projectsService.GetProjects();

            await res.Negotiate(result);
        }

        private async Task GetProject(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            var projectId = routeData.As<int>("id");

            var result = this.projectsService.GetProject(projectId);

            await res.Negotiate(result);
        }

        private async Task PostProject(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            var resource = req.Bind<ProjectResource>();
            var employeeUrl = req.HttpContext.User.GetEmployeeUrl();

            var result = this.projectsService.AddProject(resource, employeeUrl);

            await res.Negotiate(result);
        }
    }
}