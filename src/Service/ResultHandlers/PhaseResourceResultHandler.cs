namespace Linn.Projects.Service.ResultHandlers
{
    using System;
    using System.Linq;
    using Linn.Common.Facade.Carter.Handlers;
    using Linn.Projects.Facade.Resources;

    public class PhaseResourceResultHandler : JsonResultHandler<PhaseResource>
    {
        public override Func<PhaseResource, string> GenerateLocation => r => r.Links.FirstOrDefault(l => l.Rel == "self")?.Href;
    }
}
