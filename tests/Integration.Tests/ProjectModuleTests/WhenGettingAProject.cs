namespace Integration.Tests.ProjectModuleTests
{
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingAProject : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectsService.GetProject(1).Returns(new SuccessResult<Project>(
                new Project
                {
                    Name = "Project 1"
                }));

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