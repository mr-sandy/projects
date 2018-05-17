namespace Integration.Tests
{
    using System;
    using System.Net.Http;
    using System.Threading.Tasks;
    using Carter;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.Extensions.DependencyInjection;

    public static class TestClient
    {
        public static HttpClient With(Action<IServiceCollection> serviceConfiguration, params Func<RequestDelegate, RequestDelegate>[] middlewares)
        {
            var server = new TestServer(
                new WebHostBuilder()
                    .ConfigureServices(
                        services =>
                        {
                            services.Apply(serviceConfiguration);
                            services.AddCarter();
                        })
                    .Configure(app =>
                    {
                        if (middlewares != null)
                        {
                            foreach (var middleware in middlewares)
                            {
                                app.Use(middleware);
                            }
                        }
                        app.UseCarter();
                    }));

            return server.CreateClient();
        }
    }
}