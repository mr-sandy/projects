namespace Integration.Tests.ProjectModuleTests
{
    using System;
    using System.Linq;
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Facade.Resources.Activities;
    using Newtonsoft.Json;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingProjectActivities : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 31), 0));

            project.AddPhase(new AddPhaseActivity("/employees/1", PhaseStatus.Planned, new DateTime(2018, 8, 31)));
            project.Update(new UpdateActivity("/employees/1", "Project One", new DateTime(2018, 7, 31)));
            project.RemovePhase(new RemovePhaseActivity("/employees/1", 0));

            this.ProjectRepository.Get(1).Returns(project);

            this.Response = this.Client.Get("/projects/1/activities", with =>
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
            var settings = new JsonSerializerSettings();
            settings.Converters.Add(new ActivityResourceConverter());

            var resources = this.Response.DeserializeBody<ActivityResource[]>(settings);

            resources.Should().NotBeNull();
            resources.Should().HaveCount(4);

            resources.Should().Contain(r => r.Type == "create");
            resources.Should().Contain(r => r.Type == "update");
            resources.Should().Contain(r => r.Type == "add-phase");
            resources.Should().Contain(r => r.Type == "remove-phase");
        }
    }
}