namespace Linn.Projects.Facade
{
    using System.Collections.Generic;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;

    public interface IProjectsService
    {
        IResult<Project> GetProject(int projectId);

        IResult<IEnumerable<Project>> GetProjects();

        IResult<Project> AddProject(ProjectResource resource, string employeeUrl);
    }
}
