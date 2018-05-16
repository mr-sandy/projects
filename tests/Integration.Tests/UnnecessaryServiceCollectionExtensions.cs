﻿namespace Integration.Tests
{
    using System;
    using Microsoft.Extensions.DependencyInjection;

    public static class UnnecessaryServiceCollectionExtensions
    {
        public static IServiceCollection Apply(this IServiceCollection services, Action<IServiceCollection> action)
        {
            action.Invoke(services);
            return services;
        }
    }
}