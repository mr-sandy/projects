namespace Unit.Tests.ProjectTests
{
    using System.Linq;
    using FluentAssertions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using NUnit.Framework;

    public class WhenCreatingAProject
    {
        private Project project;

        [SetUp]
        public void SetUp()
        {
            this.project = new Project(new CreateProjectActivity("/employees/1") { Name = "Project 1" });
        }

        [Test]
        public void TheProjectNameShouldBeSet()
        {
            this.project.Name.Should().Be("Project 1");
        }

        [Test]
        public void TheCreateActivityShouldBeRecorded()
        {
            this.project.Activities.Should().HaveCount(1);
            this.project.Activities.OfType<CreateProjectActivity>().Should().HaveCount(1);
        }
    }
}
