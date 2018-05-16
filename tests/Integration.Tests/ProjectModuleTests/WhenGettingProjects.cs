namespace Integration.Tests.ProjectModuleTests
{
    using System.Collections.Generic;
    using System.Linq;
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingProjects : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectsService.GetProjects().Returns(new SuccessResult<IEnumerable<Project>>(new[]
            {
                new Project
                {
                    Name = "Project 1"
                },
                new Project
                {
                    Name = "Project 2"
                }
            }));

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
