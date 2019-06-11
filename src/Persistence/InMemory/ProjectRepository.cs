namespace Linn.Projects.Persistence.InMemory
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Domain.Repositories;

    public class InMemoryProjectRepository : IProjectRepository
    {
        private readonly List<Project> projects = new List<Project>(new[]
        {
            new Project(new CreateActivity("/employees/32942", "Project 1", DateTime.Now, 5)) {Id = 1},
            new Project(new CreateActivity("/employees/32942", "Project 2", DateTime.Now, 4)) {Id = 2},
            new Project(new CreateActivity("/employees/32942", "Project 3", DateTime.Now, 3)) {Id = 3}
        });

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
