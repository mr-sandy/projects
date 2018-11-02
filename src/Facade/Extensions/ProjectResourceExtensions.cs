namespace Linn.Projects.Facade.Extensions
{
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;

    public static class ProjectResourceExtensions
    {
        public static CreateActivity ToCreateActivity(this ProjectResource resource, int? phases, string employeeUrl)
        {
            return new CreateActivity(employeeUrl, resource.Name, resource.StartDate, phases ?? 5);
        }

        public static UpdateActivity ToUpdateActivity(this ProjectResource resource, string employeeUrl)
        {
            return new UpdateActivity(employeeUrl, resource.Name, resource.StartDate);
        }
    }
}
