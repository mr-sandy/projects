namespace Linn.Projects.Facade.ResourceBuilders
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;

    public class ProjectsResourceBuilder : IResourceBuilder<IEnumerable<Project>>
    {
        private readonly ProjectResourceBuilder projectResourceBuilder;

        public ProjectsResourceBuilder(ProjectResourceBuilder projectResourceBuilder)
        {
            this.projectResourceBuilder = projectResourceBuilder;
        }

        public IEnumerable<ProjectResource> Build(IEnumerable<Project> projects)
        {
            return projects?.Select(this.projectResourceBuilder.Build);
        }

        public string GetLocation(IEnumerable<Project> model)
        {
            throw new NotImplementedException();
        }

        object IResourceBuilder<IEnumerable<Project>>.Build(IEnumerable<Project> model) => this.Build(model);
    }
}