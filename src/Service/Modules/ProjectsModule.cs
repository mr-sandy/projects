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
            this.Post("/projects", this.PostProject);
            this.Get("/projects/{id:int}", this.GetProject);
            this.Put("/projects/{id:int}", this.PutProject);
            this.Delete("/projects/{id:int}", this.DeleteProject);
            this.Get("/projects/{id:int}/activities", this.GetProjectActivities);
            this.Post("/projects/{id:int}/phases", this.PostPhase);
            this.Put("/projects/{id:int}/phases/{phaseNumber:int}", this.PutPhase);
            this.Delete("/projects/{id:int}/phases/{phaseNumber:int}", this.DeletePhase);
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

        private async Task PutProject(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            this.RequiresEmployeeClaim();

            var projectId = routeData.As<int>("id");
            var resource = req.Bind<ProjectResource>();
            var employeeUrl = req.HttpContext.User.GetEmployeeUrl();

            var result = this.projectsService.UpdateProject(projectId, resource, employeeUrl);

            await res.Negotiate(result);
        }

        private async Task DeleteProject(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            this.RequiresEmployeeClaim();

            var projectId = routeData.As<int>("id");

            var result = this.projectsService.DeleteProject(projectId);

            await res.Negotiate(result);
        }

        private async Task GetProjectActivities(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            var projectId = routeData.As<int>("id");

            var result = this.projectsService.GetProjectActivities(projectId);

            await res.Negotiate(result);
        }

        private async Task PostProject(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            this.RequiresEmployeeClaim();

            var resource = req.Bind<ProjectResource>();
            var phases = req.Query.LookupAsInt("phases");
            var employeeUrl = req.HttpContext.User.GetEmployeeUrl();

            var result = this.projectsService.AddProject(resource, phases, employeeUrl);

            await res.Negotiate(result);
        }

        private async Task PostPhase(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            this.RequiresEmployeeClaim();

            var projectId = routeData.As<int>("id");
            var resource = req.Bind<PhaseResource>();
            var employeeUrl = req.HttpContext.User.GetEmployeeUrl();

            var result = this.projectsService.AddPhase(projectId, resource, employeeUrl);

            await res.Negotiate(result);
        }

        private async Task PutPhase(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            this.RequiresEmployeeClaim();

            var projectId = routeData.As<int>("id");
            var phaseNumber = routeData.As<int>("phaseNumber");
            var resource = req.Bind<PhaseResource>();
            var employeeUrl = req.HttpContext.User.GetEmployeeUrl();

            var result = this.projectsService.UpdatePhase(projectId, phaseNumber, resource, employeeUrl);

            await res.Negotiate(result);
        }

        private async Task DeletePhase(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            this.RequiresEmployeeClaim();

            var projectId = routeData.As<int>("id");
            var phaseNumber = routeData.As<int>("phaseNumber");
            var employeeUrl = req.HttpContext.User.GetEmployeeUrl();

            var result = this.projectsService.DeletePhase(projectId, phaseNumber, employeeUrl);

            await res.Negotiate(result);
        }
    }
}