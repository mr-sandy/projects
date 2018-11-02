namespace Linn.Projects.Facade.ResourceBuilders
{
    using System;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Extensions;
    using Linn.Projects.Facade.Resources.Activities;

    public class ActivityResourceBuilder
    {
        public ActivityResource Build(Activity activity)
        {
            ActivityResource resource;

            switch (activity)
            {
                case CreateActivity createActivity:
                    resource= new CreateActivityResource
                    {
                        Name = createActivity.Name,
                        StartDate = createActivity.StartDate
                    };
                    break;

                case UpdateActivity updateActivity:
                    resource = new UpdateActivityResource
                    {
                        Name = updateActivity.Name,
                        StartDate = updateActivity.StartDate,
                        PreviousName = updateActivity.PreviousName,
                        PreviousStartDate = updateActivity.PreviousStartDate
                    };
                    break;

                case AddPhaseActivity addPhaseActivity:
                    resource = new AddPhaseActivityResource
                    {
                        PhaseNumber = addPhaseActivity.PhaseNumber,
                        Status = addPhaseActivity.Status.ToResource(),
                        EndDate = addPhaseActivity.EndDate
                    };
                    break;

                case UpdatePhaseActivity updatePhaseActivity:
                    resource = new UpdatePhaseActivityResource
                    {
                        PhaseNumber = updatePhaseActivity.PhaseNumber,
                        Status = updatePhaseActivity.Status.ToResource(),
                        EndDate = updatePhaseActivity.EndDate,
                        PreviousStatus = updatePhaseActivity.PreviousStatus.ToResource(),
                        PreviousEndDate = updatePhaseActivity.PreviousEndDate
                    };
                    break;

                case RemovePhaseActivity removePhaseActivity:
                    resource = new RemovePhaseActivityResource
                    {
                        PhaseNumber = removePhaseActivity.PhaseNumber
                    };
                    break;

                default:
                    throw new Exception($"Unknown activity type: '{activity.GetType().Name}'");
            }

            resource.EmployeeUrl = activity.EmployeeUrl;
            resource.ActivityDate = activity.ActivityDate;

            return resource;
        }
    }
}