namespace Linn.Projects.Service.ResultHandlers
{
    using System;
    using System.Linq;
    using Linn.Common.Facade.Carter.Handlers;
    using Linn.Projects.Facade.Resources;

    public class ProjectResourceResultHandler : JsonResultHandler<ProjectResource>
    {
        public override Func<ProjectResource, string> GenerateLocation => r => r.Links.FirstOrDefault(l => l.Rel == "self")?.Href;
    }
}
