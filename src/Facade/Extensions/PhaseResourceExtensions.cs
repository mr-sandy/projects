namespace Linn.Projects.Facade.Extensions
{
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;

    public static class PhaseResourceExtensions
    {
        public static AddPhaseActivity ToAddPhaseActivity(this PhaseResource resource, string employeeUrl)
        {
            return new AddPhaseActivity(employeeUrl, resource.Status.ToPhaseStatus(), resource.EndDate);
        }

        public static UpdatePhaseActivity ToUpdatePhaseActivity(this PhaseResource resource, string employeeUrl, int phaseNumber)
        {
            return new UpdatePhaseActivity(employeeUrl, phaseNumber, resource.Status.ToPhaseStatus(), resource.EndDate);
        }
    }
}