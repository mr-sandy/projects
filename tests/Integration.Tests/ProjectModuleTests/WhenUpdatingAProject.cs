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

    public class WhenUpdatingAProject : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 17), 0))
            {
                Id = 1
            };

            this.ProjectRepository.Get(1).Returns(project);

            var payload = new
            {
                name = "Updated Project Name",
                startDate = "2018-07-18T00:00:00.000Z"
            };

            this.Response = this.Client.Put("/projects/1", payload, with =>
            {
                with.Accept("application/json");
            }).Result;
        }

        [Test]
        public void ShouldReturnSuccess()
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

            resource.Name.Should().Be("Updated Project Name");
            resource.StartDate.Should().Be(new DateTime(2018, 7, 18));
        }
    }
}