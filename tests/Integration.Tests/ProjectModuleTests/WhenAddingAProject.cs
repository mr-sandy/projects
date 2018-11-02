namespace Integration.Tests.ProjectModuleTests
{
    using System;
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;
    using Linn.Projects.Facade.Resources.Activities;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenAddingAProject : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectRepository.When(a => a.Add(Arg.Any<Project>())).Do(callInfo =>
            {
                var project = (Project)callInfo.Args()[0];
                project.Id = 1;
            });

            var payload = new
            {
                name = "New Project",
                startDate = "2018-07-18T00:00:00.000Z"
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
            resources.StartDate.Should().Be(new DateTime(2018, 7, 18));
        }
    }
}