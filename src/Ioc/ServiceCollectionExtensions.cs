namespace Linn.Projects.Ioc
{
    using System.Collections.Generic;
    //using Linn.Common.Facade.Carter;
    //using Linn.Common.Facade.Carter.Handlers;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Domain.Repositories;
    using Linn.Projects.Facade;
    using Linn.Projects.Facade.ResourceBuilders;
    using Linn.Projects.Persistence;
    using Linn.Projects.Persistence.InMemory;
    using Linn.Projects.Persistence.Repositories;
    using Microsoft.Extensions.DependencyInjection;

    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddHandlers(this IServiceCollection services)
        {
            return services;
            //return services
            //    .AddTransient<PhaseResourceBuilder>()
            //    .AddTransient<ProjectResourceBuilder>()
            //    .AddTransient<ProjectsResourceBuilder>()
            //    .AddTransient<ActivitiesResourceBuilder>()
            //    .AddTransient<IHandler, JsonResultHandler<Phase, PhaseResourceBuilder>>()
            //    .AddTransient<IHandler, JsonResultHandler<Project, ProjectResourceBuilder>>()
            //    .AddTransient<IHandler, JsonResultHandler<IEnumerable<Activity>, ActivitiesResourceBuilder>>()
            //    .AddTransient<IHandler, JsonResultHandler<IEnumerable<Project>, ProjectsResourceBuilder>>();
        }

        public static IServiceCollection AddPersistence(this IServiceCollection services)
        {
            return services;
            //return services
            //    .AddSingleton<ITransactionManager, InMemoryTransactionManager>()
            //    .AddSingleton<IProjectRepository, InMemoryProjectRepository>();

            //return services
            //    .AddScoped<ServiceDbContext>()
            //    .AddTransient<ITransactionManager, TransactionManager>()
            //    .AddTransient<IProjectRepository, ProjectRepository>();
        }

        public static IServiceCollection AddFacade(this IServiceCollection services)
        {
            return services;
            //return services.AddTransient<IProjectsService, ProjectsService>();
        }
    }
}
