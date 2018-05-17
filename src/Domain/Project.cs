namespace Linn.Projects.Domain
{
    using System.Collections.Generic;
    using Linn.Projects.Domain.Activities;

    public class Project
    {
        private readonly List<ProjectActivity> activities = new List<ProjectActivity>();

        public Project(CreateProjectActivity activity)
        {
            this.Name = activity.Name;

            this.activities.Add(activity);
        }

        public int Id { get; set; }

        public string Name { get; private set; }

        public IEnumerable<ProjectActivity> Activities => this.activities;
    }
}
