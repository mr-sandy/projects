using Carter.ModelBinding;
using Linn.Common.Facade.Carter.Tests.Fake.Facades;
using Linn.Common.Facade.Carter.Tests.Fake.Resources;

namespace Linn.Common.Facade.Carter.Tests.Fake.Modules
{
    using System.Threading.Tasks;
    using global::Carter;
    using global::Carter.Request;
    using global::Carter.Response;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Routing;

    public class WidgetModule : CarterModule
    {
        private readonly IWidgetService widgetService;

        public WidgetModule(IWidgetService widgetService)
        {
            this.widgetService = widgetService;
            this.Get("/widgets/{id:int}", this.GetWidgets);
            this.Post("/widgets", this.PostWidget);
        }

        private async Task GetWidgets(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            var widgetId = routeData.As<int>("id");

            var result = this.widgetService.GetWidget(widgetId);

            await res.Negotiate(result);
        }
        private async Task PostWidget(HttpRequest req, HttpResponse res, RouteData routeData)
        {
            var resource = req.Bind<WidgetResource>();

            var result = this.widgetService.CreateWidget(resource);

            await res.Negotiate(result);
        }

    }
}
