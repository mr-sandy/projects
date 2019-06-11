namespace Linn.Common.Facade.Carter.Tests
{
    using System.Net.Http;
    using global::Carter;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.Extensions.DependencyInjection;
    using Linn.Common.Facade.Carter.Tests.Fake.Facades;
    using Linn.Common.Facade.Carter.Tests.Fake.Handlers;
    using NUnit.Framework;
    using Linn.Common.Facade.Carter.Handlers;

    public abstract class ContextBase
    {
        protected HttpClient Client { get; private set; }

        protected HttpResponseMessage Response { get; set; }

        protected IWidgetService WidgetService { get; private set; }

        [SetUp]
        public void SetupContext()
        {
            this.WidgetService = NSubstitute.Substitute.For<IWidgetService>();

            var server = new TestServer(
                new WebHostBuilder()
                    .ConfigureServices(services =>
                    {
                        services.AddTransient<IHandler, WidgetResourceJsonResultHandler>();
                        services.AddSingleton(this.WidgetService);
                        services.AddTransient<UniversalResponseNegotiator>();
                        services.AddCarter();
                    })
                    .Configure(app => app.UseCarter())
            );

            this.Client = server.CreateClient();
        }
    }
}