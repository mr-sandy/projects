using Linn.Projects.Facade.Resources.Activities;

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

        public IResult<ProjectResource> GetProject(int projectId)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<ProjectResource>();
            }

            return new SuccessResult<ProjectResource>(project.ToResource());
        }

        public IResult<ProjectResource> UpdateProject(int projectId, ProjectResource resource, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<ProjectResource>();
            }

            var activity = resource.ToUpdateActivity(employeeUrl);

            project.Update(activity);

            this.transactionManager.Commit();

            return new SuccessResult<ProjectResource>(project.ToResource());
        }

        public IResult<ProjectResource> DeleteProject(int projectId)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<ProjectResource>();
            }

            this.projectRepository.Remove(project);

            this.transactionManager.Commit();

            return new SuccessResult<ProjectResource>(project.ToResource());
        }

        public IResult<IEnumerable<ActivityResource>> GetProjectActivities(int projectId)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<IEnumerable<ActivityResource>>();
            }

            return new SuccessResult<IEnumerable<ActivityResource>>(project.Activities.ToResource());
        }

        public IResult<IEnumerable<ProjectResource>> GetProjects()
        {
            var projects = this.projectRepository.GetAll().ToArray();

            return new SuccessResult<IEnumerable<ProjectResource>>(projects.ToResource());
        }

        public IResult<ProjectResource> AddProject(ProjectResource resource, int? phases, string employeeUrl)
        {
            var activity = resource.ToCreateActivity(phases, employeeUrl);

            var project = Project.Build(activity);

            this.projectRepository.Add(project);

            this.transactionManager.Commit();

            return new CreatedResult<ProjectResource>(project.ToResource());
        }

        public IResult<PhaseResource> AddPhase(int projectId, PhaseResource resource, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<PhaseResource>();
            }

            var activity = resource.ToAddPhaseActivity(employeeUrl);

            var phase = project.AddPhase(activity);

            this.transactionManager.Commit();

            return new CreatedResult<PhaseResource>(phase.ToResource());
        }

        public IResult<PhaseResource> UpdatePhase(int projectId, int phaseNumber, PhaseResource resource, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<PhaseResource>();
            }

            var activity = resource.ToUpdatePhaseActivity(employeeUrl, phaseNumber);

            var phase = project.UpdatePhase(activity);

            this.transactionManager.Commit();

            return new SuccessResult<PhaseResource>(phase.ToResource());
        }

        public IResult<PhaseResource> DeletePhase(int projectId, int phaseNumber, string employeeUrl)
        {
            var project = this.projectRepository.Get(projectId);

            if (project == null)
            {
                return new NotFoundResult<PhaseResource>();
            }

            var activity = new RemovePhaseActivity(employeeUrl, phaseNumber);

            var phase = project.RemovePhase(activity);

            this.transactionManager.Commit();

            return new SuccessResult<PhaseResource>(phase.ToResource());
        }
    }
}