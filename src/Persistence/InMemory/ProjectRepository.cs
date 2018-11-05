namespace Linn.Projects.Persistence.InMemory
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Repositories;

    public class InMemoryProjectRepository : IProjectRepository
    {
        private readonly List<Project> projects  = new List<Project>();

        public IEnumerable<Project> GetAll()
        {
            return this.projects;
        }

        public Project Get(int id)
        {
            return this.projects.SingleOrDefault(t => t.Id == id);
        }

        public void Add(Project project)
        {
            this.projects.Add(project);
        }

        public void Remove(Project project)
        {
            this.projects.Remove(project);
        }
    }
}
