namespace Integration.Tests.ProjectModuleTests
{
    using System;
    using System.Linq;
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenRemovingAPhase : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 31), 0))
            {
                Id = 1
            };

            project.AddPhase(new AddPhaseActivity("/employees/1", PhaseStatus.Planned, new DateTime(2018, 8, 31)));

            this.ProjectRepository.Get(1).Returns(project);

            this.Response = this.Client.Delete("/projects/1/phases/0", with =>
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
            var resource = this.Response.DeserializeBody<PhaseResource>();
            resource.Should().NotBeNull();

            resource.Links.Should().Contain(l => l.Rel == "self");
            resource.Links.FirstOrDefault(l => l.Rel == "self")?.Href.Should().Be("/projects/1/phases/1");
        }
    }
}