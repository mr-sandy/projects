namespace Integration.Tests.ProjectModuleTests
{
    using System;
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingAProject : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 31), 5));

            this.ProjectRepository.Get(1).Returns(project);

            this.Response = this.Client.Get("/projects/1", with =>
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
            var resource = this.Response.DeserializeBody<ProjectResource>();
            resource.Should().NotBeNull();

            resource.Name.Should().Be("Project 1");
        }
    }
}