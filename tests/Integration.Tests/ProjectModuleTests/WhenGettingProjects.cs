namespace Integration.Tests.ProjectModuleTests
{
    using System.Collections.Generic;
    using System.Linq;
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingProjects : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectRepository.GetAll().Returns(new[]
            {
                new Project(new CreateProjectActivity("/employees/1")
                {
                    Name = "Project 1"
                }),
                new Project(new CreateProjectActivity("/employees/1")
                {
                    Name = "Project 2"
                })
            });

            this.Response = this.Client.Get("/projects", with =>
            {
                with.Accept("application/json");
            }).Result;
        }

        [Test]
        public void ShouldReturnOk()
        {
            this.Response.StatusCode.Should().Be(200);
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
            var resources = this.Response.DeserializeBody<IEnumerable<ProjectResource>>()?.ToArray();
            resources.Should().NotBeNull();
            resources.Should().HaveCount(2);

            resources.First().Name.Should().Be("Project 1");
            resources.Second().Name.Should().Be("Project 2");
        }
    }
}
