namespace Linn.Projects.Facade
{
    using System.Collections.Generic;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Repositories;
    using Linn.Projects.Facade.Extensions;
    using Linn.Projects.Facade.Resources;

    public class ProjectsService : IProjectsService
    {
        private readonly IProjectRepository projectRepository;

        public ProjectsService(IProjectRepository projectRepository)
        {
            this.projectRepository = projectRepository;
        }

        public IResult<Project> GetProject(int projectId)
        {
            throw new System.NotImplementedException();
        }

        public IResult<IEnumerable<Project>> GetProjects()
        {
            var projects = this.projectRepository.GetAll();

            return new SuccessResult<IEnumerable<Project>>(projects);
        }

        public IResult<Project> AddProject(ProjectResource resource)
        {
            var project = resource.ToDomain();

            this.projectRepository.Add(project);

            return new CreatedResult<Project>(project);
        }
    }
}