namespace Linn.Projects.Ioc
{
    using Linn.Common.Facade.Carter;
    using Linn.Common.Facade.Carter.Handlers;
    using Linn.Projects.Domain.Repositories;
    using Linn.Projects.Facade;
    using Linn.Projects.Facade.Resources;
    using Linn.Projects.Facade.Resources.Activities;
    using Linn.Projects.Persistence;
    using Linn.Projects.Persistence.Repositories;
    using Linn.Projects.Service.ResultHandlers;
    using Microsoft.Extensions.DependencyInjection;
    using System.Collections.Generic;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHandlers(this IServiceCollection services)
        {
            return services
                .AddTransient<UniversalResponseNegotiator>()
                .AddTransient<IHandler, PhaseResourceResultHandler>()
                .AddTransient<IHandler, ProjectResourceResultHandler>()
                .AddTransient<IHandler, JsonResultHandler<IEnumerable<ProjectResource>>>()
                .AddTransient<IHandler, JsonResultHandler<IEnumerable<ActivityResource>>>();
        }

        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            return services
                .AddScoped<ServiceDbContext>()
                .AddTransient<ITransactionManager, TransactionManager>()
                .AddTransient<IProjectRepository, ProjectRepository>();
        }

        public static IServiceCollection AddFacade(this IServiceCollection services)
        {
            return services.AddTransient<IProjectsService, ProjectsService>();
        }
    }
}
