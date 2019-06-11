using System.Collections.Generic;
using System.Linq;
using Linn.Projects.Domain.Activities;
using Linn.Projects.Facade.ResourceBuilders;
using Linn.Projects.Facade.Resources.Activities;

namespace Linn.Projects.Facade.Extensions
{
    public static class ActivityExtensions
    {
        public static IEnumerable<ActivityResource> ToResource(this IEnumerable<Activity> activities)
        {
            var builder = new ActivityResourceBuilder();

            return activities.Select(project => builder.Build(project));
        }
    }
}