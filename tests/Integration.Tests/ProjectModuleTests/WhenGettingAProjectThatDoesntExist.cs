namespace Integration.Tests.ProjectModuleTests
{
    using FluentAssertions;
    using Integration.Tests.Extensions;
    using Linn.Projects.Domain;
    using NSubstitute;
    using NUnit.Framework;

    public class WhenGettingAProjectThatDoesntExist : ContextBase
    {
        [SetUp]
        public void SetUp()
        {
            this.ProjectRepository.Get(1).Returns((Project)null);

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