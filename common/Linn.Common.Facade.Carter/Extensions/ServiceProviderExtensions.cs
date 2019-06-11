﻿namespace Linn.Common.Facade.Carter.Extensions
{
    using System;
    using System.Linq;
    using Linn.Common.Facade.Carter.Handlers;
    using Microsoft.Extensions.DependencyInjection;

    public static class ServiceProviderExtensions
    {
        public static IHandler GetHandler(this IServiceProvider serviceProvider, object model, string contentType)
        {
            return serviceProvider
                .GetServices<IHandler>()
                .FirstOrDefault(h => h.CanHandle(model, contentType));
        }
    }
}