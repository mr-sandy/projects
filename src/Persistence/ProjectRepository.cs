namespace Linn.Projects.Persistence
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Repositories;

    public class ProjectRepository : IProjectRepository
    {
        private static readonly List<Project> Projects = new List<Project>(new[]
        {
            new Project {Id = 1, Name = "Project 1"},
            new Project {Id = 2, Name = "Project 2"},
            new Project {Id = 3, Name = "Project 3"}
        });

        public IEnumerable<Project> GetAll()
        {
            return Projects;
        }

        public void Add(Project project)
        {
            project.Id = Projects.Max(p => p.Id) + 1;
            
            Projects.Add(project);
        }
    }
}
