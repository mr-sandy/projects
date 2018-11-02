namespace Linn.Projects.Facade
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
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

        public IResult<Project> UpdateProject(int projectId, ProjectResource resource, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<Project>();
            }

            var activity = resource.ToUpdateActivity(employeeUrl);

            project.Update(activity);

            this.transactionManager.Commit();

            return new SuccessResult<Project>(project);
        }

        public IResult<Project> DeleteProject(int projectId)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<Project>();
            }

            this.projectRepository.Remove(project);

            this.transactionManager.Commit();

            return new SuccessResult<Project>(project);
        }

        public IResult<IEnumerable<Activity>> GetProjectActivities(int projectId)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<IEnumerable<Activity>>();
            }

            return new SuccessResult<IEnumerable<Activity>>(project.Activities);
        }

        public IResult<IEnumerable<Project>> GetProjects()
        {
            var projects = this.projectRepository.GetAll().ToArray();

            return new SuccessResult<IEnumerable<Project>>(projects);
        }

        public IResult<Project> AddProject(ProjectResource resource, int? phases, string employeeUrl)
        {
            var activity = resource.ToCreateActivity(phases, employeeUrl);

            var project = Project.Build(activity);

            this.projectRepository.Add(project);

            this.transactionManager.Commit();

            return new CreatedResult<Project>(project);
        }

        public IResult<Phase> AddPhase(int projectId, PhaseResource resource, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<Phase>();
            }

            var activity = resource.ToAddPhaseActivity(employeeUrl);

            var phase = project.AddPhase(activity);

            this.transactionManager.Commit();

            return new CreatedResult<Phase>(phase);
        }

        public IResult<Phase> UpdatePhase(int projectId, int phaseNumber, PhaseResource resource, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<Phase>();
            }

            var activity = resource.ToUpdatePhaseActivity(employeeUrl, phaseNumber);

            var phase = project.UpdatePhase(activity);

            this.transactionManager.Commit();

            return new SuccessResult<Phase>(phase);
        }

        public IResult<Phase> DeletePhase(int projectId, int phaseNumber, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<Phase>();
            }

            var activity = new RemovePhaseActivity(employeeUrl, phaseNumber);

            var phase = project.RemovePhase(activity);

            this.transactionManager.Commit();

            return new SuccessResult<Phase>(phase);
        }
    }
}