namespace Linn.Projects.Facade.Resources
{
    using System;
    using Linn.Common.Resources;

    public class ProjectResource : HypermediaResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public DateTime StartDate { get; set; }
        
        public PhaseResource[] Phases { get; set; } = Array.Empty<PhaseResource>();
    }
}
