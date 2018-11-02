namespace Linn.Projects.Domain.Repositories
{
    using System.Collections.Generic;

    public interface IProjectRepository
    {
        IEnumerable<Project> GetAll();

        Project Get(int id);

        void Add(Project project);

        void Remove(Project project);
    }
}