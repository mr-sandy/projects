namespace Integration.Tests.ProjectModuleTests
{
    using System.Net.Http;
    using Linn.Projects.Domain.Repositories;
    using Linn.Projects.Facade;
    using Linn.Projects.Ioc;
    using Microsoft.Extensions.DependencyInjection;
    using NUnit.Framework;

    public abstract class ContextBase
    {
        protected HttpClient Client { get; set; }

        protected HttpResponseMessage Response { get; set; }

        protected IProjectRepository ProjectRepository { get; set; }

        [SetUp]
        public void EstablishContext()
        {
            this.ProjectRepository = NSubstitute.Substitute.For<IProjectRepository>();

            this.Client = TestClient.With(services =>
                {
                    services.AddSingleton(this.ProjectRepository);
                    services.AddFacade();
                    services.AddHandlers();
                },
                FakeAuthMiddleware.EmployeeMiddleware
            );
        }
    }
}
