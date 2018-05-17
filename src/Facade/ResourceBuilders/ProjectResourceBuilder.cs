namespace Linn.Projects.Facade.ResourceBuilders
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Common.Facade;
    using Linn.Common.Resources;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;

    public class ProjectResourceBuilder : IResourceBuilder<Project>
    {
        public object Build(Project project)
        {
            return project == null
                ? null
                : new ProjectResource
                {
                    Id = project.Id,
                    Name = project.Name,
                    Activities = this.BuildActivities(project).ToArray(),
                    Links = this.BuildLinks(project).ToArray()
                };
        }

        public string GetLocation(Project project)
        {
            return $"/projects/{project.Id}";
        }

        private IEnumerable<ProjectActivityResource> BuildActivities(Project project)
        {
            foreach (var activity in project.Activities)
            {
                switch (activity)
                {
                    case CreateProjectActivity createProjectActivity:
                        yield return new ProjectActivityResource
                        {
                            EmployeeUrl = createProjectActivity.EmployeeUrl
                        };
                        break;
                }
            }
        }

        private IEnumerable<LinkResource> BuildLinks(Project project)
        {
            yield return new LinkResource("self", this.GetLocation(project));
        }
    }
}
