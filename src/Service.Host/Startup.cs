namespace Linn.Projects.Service.Host
{
    using System.IdentityModel.Tokens.Jwt;
    using System.IO;
    using Carter;
    using Linn.Common.Authentication.Host;
    using Linn.Common.Authentication.Host.Extensions;
    using Linn.Common.Configuration;
    using Linn.Projects.Ioc;
    using Linn.Projects.Service.Host.Negotiators;
    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Hosting;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.Extensions.FileProviders;

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear();

            services.AddTransient<IViewLoader, ViewLoader>();
            services.AddFacade();
            services.AddPersistence();
            services.AddHandlers();

            services.AddCors();

            services.AddLinnAuthentication(options =>
            {
                options.Authority = ConfigurationManager.Configuration["AUTHORITY_URL"];
                options.CallbackPath = "/projects/signin-oidc";
            });

            services.AddCarter();
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseStaticFiles(new StaticFileOptions
            {
                RequestPath = "/projects/build",
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), "client", "build"))
            });
            
            app.UseAuthentication();

            app.UseBearerTokenAuthentication();

            app.UseCarter(new CarterOptions(null, ChallengeHelper.TriggerOidcChallengeOnUnauthorised));
        }
    }
}
