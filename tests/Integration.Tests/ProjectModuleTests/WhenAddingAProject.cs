namespace Integration.Tests.ProjectModuleTests
{
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenAddingAProject : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectsService.AddProject(Arg.Any<ProjectResource>()).Returns(new CreatedResult<Project>(
                new Project
                {
                    Id = 1,
                    Name = "New Project"
                }
            ));


            var payload = new
            {
                name = "New Project"
            };

            this.Response = this.Client.Post("/projects", payload, with =>
            {
                with.Accept("application/json");
            }).Result;
        }

        [Test]
        public void ShouldReturnCreated()
        {
            this.Response.StatusCode.Should().Be(201);
        }

        [Test]
        public void ShouldReturnLocationHeader()
        {
            this.Response.Headers.Location.Should().NotBeNull();
            this.Response.Headers.Location.Should().Be("/projects/1");
        }

        [Test]
        public void ShouldReturnJsonContentType()
        {
            this.Response.Content.Headers.ContentType.Should().NotBeNull();
            this.Response.Content.Headers.ContentType.ToString().Should().Be("application/json");
        }

        [Test]
        public void ShouldReturnJsonBody()
        {
            var resources = this.Response.DeserializeBody<ProjectResource>();
            resources.Should().NotBeNull();

            resources.Name.Should().Be("New Project");
        }
    }
}