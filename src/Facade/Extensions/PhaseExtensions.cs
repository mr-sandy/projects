using Linn.Projects.Domain;
using Linn.Projects.Facade.ResourceBuilders;
using Linn.Projects.Facade.Resources;

namespace Linn.Projects.Facade.Extensions
{
    public static class PhaseExtensions
    {
        public static PhaseResource ToResource(this Phase phase)
        {
            var builder = new PhaseResourceBuilder();
            return builder.Build(phase);
        }
    }
}