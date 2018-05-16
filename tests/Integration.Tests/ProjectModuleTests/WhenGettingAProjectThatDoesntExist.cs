namespace Integration.Tests.ProjectModuleTests
{
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Common.Facade;
    using Linn.Projects.Domain;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingAProjectThatDoesntExist : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectsService.GetProject(1).Returns(new NotFoundResult<Project>());

            this.Response = this.Client.Get("/projects/1", with =>
            {
                with.Accept("application/json");
            }).Result;
        }

        [Test]
        public void ShouldReturnNotFound()
        {
            this.Response.StatusCode.Should().Be(404);
        }
    }
}