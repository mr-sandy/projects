namespace Linn.Projects.Facade.ResourceBuilders
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Common.Facade;
    using Linn.Common.Resources;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Extensions;
    using Linn.Projects.Facade.Resources;

    public class PhaseResourceBuilder : IResourceBuilder<Phase>
    {
        public PhaseResource Build(Phase phase)
        {
            return new PhaseResource
            {
                PhaseNumber = phase.PhaseNumber,
                Status = phase.Status.ToResource(),
                EndDate = phase.EndDate,
                Links = this.BuildLinks(phase).ToArray()
            };
        }

        public string GetLocation(Phase phase)
        {
            return $"/projects/{phase.Project.Id}/phases/1";
        }

        private IEnumerable<LinkResource> BuildLinks(Phase phase)
        {
            // a phase is detached from its project when it has been removed
            if (phase.Project != null)
            {
                yield return new LinkResource("self", this.GetLocation(phase));
            }
        }

        object IResourceBuilder<Phase>.Build(Phase model) => this.Build(model);

    }
}