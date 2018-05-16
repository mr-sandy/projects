namespace Linn.Projects.Domain.Repositories
{
    using System.Collections.Generic;

    public interface IProjectRepository
    {
        IEnumerable<Project> GetAll();

        void Add(Project project);
    }
}