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
        private readonly ITransactionManager transactionManager;
        private readonly IProjectRepository projectRepository;

        public ProjectsService(ITransactionManager transactionManager, IProjectRepository projectRepository)
        {
            this.transactionManager = transactionManager;
            this.projectRepository = projectRepository;
        }

        public IResult<Project> GetProject(int projectId)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<Project>();
            }

            return new SuccessResult<Project>(project);
        }

        public IResult<IEnumerable<Project>> GetProjects()
        {
            var projects = this.projectRepository.GetAll();

            return new SuccessResult<IEnumerable<Project>>(projects);
        }

        public IResult<Project> AddProject(ProjectResource resource, string employeeUrl)
        {
            var createActivity = resource.ToCreateActivity(employeeUrl);

            var project = new Project(createActivity);

            this.projectRepository.Add(project);

            this.transactionManager.Commit();

            return new CreatedResult<Project>(project);
        }
    }
}