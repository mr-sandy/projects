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

    public class WhenAddingAPhase : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            var createActivity = new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 18), 0);

            var project = new Project(createActivity) { Id = 1 };

            var payload = new
            {
                status = "PLANNED",
                endDate = "2018-08-20T00:00:00.000Z"
            };

            this.ProjectRepository.Get(1).Returns(project);

            this.Response = this.Client.Post("/projects/1/phases", payload, with =>
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
            this.Response.Headers.Location.Should().Be("/projects/1/phases/1");
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

            resource.PhaseNumber.Should().Be(0);
            resource.Status.Should().Be(PhaseStatusResource.Planned);
            resource.EndDate.Should().Be(new DateTime(2018, 8, 20));

            resource.Links.Should().Contain(l => l.Rel == "self");
            resource.Links.FirstOrDefault(l => l.Rel == "self")?.Href.Should().Be("/projects/1/phases/1");
        }
    }
}