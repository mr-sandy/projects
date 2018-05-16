namespace Integration.Tests
{
    using System;
    using System.Globalization;
    using System.Net.Http;
    using System.Net.NetworkInformation;
    using System.Security.Claims;
    using System.Threading.Tasks;
    using Carter;
    using Microsoft.AspNetCore.Authentication.Cookies;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.TestHost;
    using Microsoft.Extensions.DependencyInjection;

    public static class TestClient
    {
        public static HttpClient With(Action<IServiceCollection> configuration)
        {
            var server = new TestServer(
                new WebHostBuilder()
                    .ConfigureServices(
                        services =>
                        {
                            services.Apply(configuration);
                            services.AddCarter();
                        })
                    .Configure(app =>
                    {
                        app.Use(FakeUserMiddleware);
                        app.UseCarter();
                    }));

            return server.CreateClient();
        }

        private static RequestDelegate FakeUserMiddleware(RequestDelegate next) => ctx =>
        {
            var identity = new ClaimsIdentity(new[] { new Claim("sid", "12345") }, CookieAuthenticationDefaults.AuthenticationScheme);
            ctx.User = new ClaimsPrincipal(identity);

            return next(ctx);
        };
    }
}