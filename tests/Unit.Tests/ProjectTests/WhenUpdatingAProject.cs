namespace Unit.Tests.ProjectTests
{
    using System;
    using System.Linq;
    using FluentAssertions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using NUnit.Framework;

    public class WhenUpdatingAProject
    {
        private Project project;
        private UpdateActivity activity;

        [SetUp]
        public void SetUp()
        {
            this.project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 6, 11), 0));

            this.activity = new UpdateActivity("/employees/1", "New Project Name", new DateTime(2018, 7, 11));

            this.project.Update(this.activity);
        }

        [Test]
        public void TheProjectShouldHaveUpdatedDetails()
        {
            this.project.Name.Should().Be("New Project Name");
            this.project.StartDate.Should().Be(new DateTime(2018, 7, 11));
        }

        [Test]
        public void TheActivityShouldRecordThePreviousValues()
        {
            this.activity.PreviousName.Should().Be("Project 1");
            this.activity.PreviousStartDate.Should().Be(new DateTime(2018, 6, 11));
        }

        [Test]
        public void TheUpdateActivityShouldBeRecorded()
        {
            this.project.Activities.Should().HaveCount(2);
            this.project.Activities.OfType<UpdateActivity>().Should().HaveCount(1);
        }
    }
}