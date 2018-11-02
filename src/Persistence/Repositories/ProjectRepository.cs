namespace Linn.Projects.Persistence.Repositories
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Repositories;
    using Microsoft.EntityFrameworkCore;

    public class ProjectRepository : IProjectRepository
    {
        private readonly ServiceDbContext serviceDbContext;

        public ProjectRepository(ServiceDbContext serviceDbContext)
        {
            this.serviceDbContext = serviceDbContext;
        }
    
        public IEnumerable<Project> GetAll()
        {
            return this.serviceDbContext.Projects
                .Include(p => p.Phases);
        }

        public Project Get(int id)
        {
            return this.serviceDbContext.Projects
                .Include(p => p.Phases)
                .Include(p => p.Activities)
                .SingleOrDefault(t => t.Id == id);
        }

        public void Add(Project project)
        {
            this.serviceDbContext.Projects.Add(project);
        }

        public void Remove(Project project)
        {
            this.serviceDbContext.Projects.Remove(project);
        }
    }
}
