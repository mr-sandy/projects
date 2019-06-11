using System.Collections.Generic;
using System.Linq;
using Linn.Projects.Domain;
using Linn.Projects.Facade.ResourceBuilders;
using Linn.Projects.Facade.Resources;

namespace Linn.Projects.Facade.Extensions
{
    public static class ProjectExtensions
    {
        public static ProjectResource ToResource(this Project project)
        {
            var builder = new ProjectResourceBuilder();
            return builder.Build(project);
        }

        public static IEnumerable<ProjectResource> ToResource(this IEnumerable<Project> projects)
        {
            var builder = new ProjectResourceBuilder();

            return projects.Select(project => builder.Build(project));
        }
    }
}