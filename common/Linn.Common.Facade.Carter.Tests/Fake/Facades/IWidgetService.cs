using Linn.Common.Facade.Carter.Tests.Fake.Resources;

namespace Linn.Common.Facade.Carter.Tests.Fake.Facades
{
    public interface IWidgetService
    {
        IResult<WidgetResource> GetWidget(int widgetId);

        IResult<WidgetResource> CreateWidget(WidgetResource resource);

    }
}
