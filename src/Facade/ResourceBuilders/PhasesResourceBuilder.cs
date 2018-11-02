namespace Linn.Projects.Facade.ResourceBuilders
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;

    public class PhasesResourceBuilder
    {
        public IEnumerable<PhaseResource> Build(IEnumerable<Phase> phases)
        {
            var phaseResourceBuilder = new PhaseResourceBuilder();

            return phases?
                .OrderBy(p => p.PhaseNumber)
                .Select(phaseResourceBuilder.Build);
        }
    }
}