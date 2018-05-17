namespace Linn.Projects.Persistence
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Domain.Repositories;

    public class ProjectRepository : IProjectRepository
    {
        private static readonly List<Project> Projects = new List<Project>(new[]
        {
            new Project(new CreateProjectActivity("/employees/1") {Name = "Project 1"}) {Id = 1},
            new Project(new CreateProjectActivity("/employees/1") {Name = "Project 2"}) {Id = 2},
            new Project(new CreateProjectActivity("/employees/1") {Name = "Project 3"}) {Id = 3}
        });

        public IEnumerable<Project> GetAll()
        {
            return Projects;
        }

        public Project Get(int id)
        {
            return Projects.FirstOrDefault(p => p.Id == id);
        }

        public void Add(Project project)
        {
            project.Id = Projects.Max(p => p.Id) + 1;

            Projects.Add(project);
        }
    }
}
