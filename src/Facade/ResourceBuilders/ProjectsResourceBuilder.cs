namespace Linn.Projects.Facade.ResourceBuilders
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;

    public class ProjectsResourceBuilder : IResourceBuilder<IEnumerable<Project>>
    {
        private readonly ProjectResourceBuilder projectResourceBuilder;

        public ProjectsResourceBuilder(ProjectResourceBuilder projectResourceBuilder)
        {
            this.projectResourceBuilder = projectResourceBuilder;
        }

        public object Build(IEnumerable<Project> projects)
        {
            return projects?.Select(this.projectResourceBuilder.Build);
        }

        public string GetLocation(IEnumerable<Project> model)
        {
            throw new NotImplementedException();
        }
    }
}