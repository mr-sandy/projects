namespace Linn.Projects.Facade.Extensions
{
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;

    public static class ProjectResourceExtensions
    {
        public static CreateProjectActivity ToCreateActivity(this ProjectResource resource, string employeeUrl)
        {
            return new CreateProjectActivity(employeeUrl)
            {
                Name = resource.Name
            };
        }
    }
}
