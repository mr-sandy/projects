using System;
using Linn.Common.Facade.Carter.Handlers;
using Linn.Common.Facade.Carter.Serialisers;
using Linn.Common.Facade.Carter.Tests.Fake.Resources;

namespace Linn.Common.Facade.Carter.Tests.Fake.Handlers
{
    public class WidgetResourceJsonResultHandler : ResultHandler<WidgetResource>
    {
        public WidgetResourceJsonResultHandler() 
            : base("application/json", new JsonSerialiser())
        {
        }

        public override Func<WidgetResource, string> GenerateLocation
        {
            get
            {
                return r => $"/widgets/{r.Id}";
            }
        }
    }
}
