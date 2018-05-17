namespace Linn.Projects.Facade.Resources
{
    using System;
    using Linn.Common.Resources;

    public class ProjectResource : HypermediaResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public PhaseResource[] Phases { get; set; } = Array.Empty<PhaseResource>();

        public ProjectActivityResource[] Activities { get; set; } = Array.Empty<ProjectActivityResource>();
    }
}
