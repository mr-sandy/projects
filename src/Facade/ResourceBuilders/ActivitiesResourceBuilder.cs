namespace Linn.Projects.Facade.ResourceBuilders
{
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Common.Facade;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources.Activities;

    public class ActivitiesResourceBuilder : IResourceBuilder<IEnumerable<Activity>>
    {
        public IEnumerable<ActivityResource> Build(IEnumerable<Activity> activities)
        {
            var activityResourceBuilder = new ActivityResourceBuilder();

            return activities?
                .OrderBy(a => a.ActivityDate)
                .Select(a => activityResourceBuilder.Build(a));
        }

        public string GetLocation(IEnumerable<Activity> model)
        {
            throw new System.NotImplementedException();
        }

        object IResourceBuilder<IEnumerable<Activity>>.Build(IEnumerable<Activity> model) => this.Build(model);
    }
}