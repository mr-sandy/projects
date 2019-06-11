using Linn.Projects.Facade.Resources.Activities;

namespace Linn.Projects.Facade
{
    using System.Collections.Generic;
    using Linn.Common.Facade;
    using Linn.Projects.Facade.Resources;

    public interface IProjectsService
    {
        IResult<IEnumerable<ProjectResource>> GetProjects();

        IResult<ProjectResource> GetProject(int projectId);

        IResult<ProjectResource> UpdateProject(int projectId, ProjectResource resource, string employeeUrl);

        IResult<ProjectResource> DeleteProject(int projectId);
        
        IResult<IEnumerable<ActivityResource>> GetProjectActivities(int projectId);

        IResult<ProjectResource> AddProject(ProjectResource resource, int? phases, string employeeUrl);

        IResult<PhaseResource> AddPhase(int projectId, PhaseResource resource, string employeeUrl);

        IResult<PhaseResource> UpdatePhase(int projectId, int phaseNumber, PhaseResource resource, string employeeUrl);

        IResult<PhaseResource> DeletePhase(int projectId, int phaseNumber, string employeeUrl);
    }
}
