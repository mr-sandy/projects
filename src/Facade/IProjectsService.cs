namespace Linn.Projects.Facade
{
    using System.Collections.Generic;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;

    public interface IProjectsService
    {
        IResult<IEnumerable<Project>> GetProjects();

        IResult<Project> GetProject(int projectId);

        IResult<Project> UpdateProject(int projectId, ProjectResource resource, string employeeUrl);

        IResult<Project> DeleteProject(int projectId);
        
        IResult<IEnumerable<Activity>> GetProjectActivities(int projectId);

        IResult<Project> AddProject(ProjectResource resource, int? phases, string employeeUrl);

        IResult<Phase> AddPhase(int projectId, PhaseResource resource, string employeeUrl);

        IResult<Phase> UpdatePhase(int projectId, int phaseNumber, PhaseResource resource, string employeeUrl);

        IResult<Phase> DeletePhase(int projectId, int phaseNumber, string employeeUrl);
    }
}
