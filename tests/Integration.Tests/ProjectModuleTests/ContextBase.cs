namespace Integration.Tests.ProjectModuleTests
{
    using System.Net.Http;
    using Linn.Projects.Facade;
    using Linn.Projects.Ioc;
    using Microsoft.Extensions.DependencyInjection;
    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected HttpClient Client { get; set; }

        protected HttpResponseMessage Response { get; set; }

        protected IProjectsService ProjectsService { get; set; }

        [SetUp]
        public void EstablishContext()
        {
            this.ProjectsService = NSubstitute.Substitute.For<IProjectsService>();

            this.Client = TestClient.With(services =>
            {
                services.AddSingleton(this.ProjectsService);
                services.AddHandlers();
            });
        }
    }
}
