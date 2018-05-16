namespace Linn.Projects.Facade.Resources
{
    using System.Linq;
    using Linn.Common.Resources;

    public class ProjectResource : HypermediaResource
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public PhaseResource[] Phases { get; set; } = Enumerable.Empty<PhaseResource>().ToArray();
    }
}
