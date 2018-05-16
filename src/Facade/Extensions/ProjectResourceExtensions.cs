namespace Linn.Projects.Facade.Extensions
{
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;

    public static class ProjectResourceExtensions
    {
        public static Project ToDomain(this ProjectResource resource)
        {
            return new Project
            {
                Name = resource.Name
            };
        }
    }
}
