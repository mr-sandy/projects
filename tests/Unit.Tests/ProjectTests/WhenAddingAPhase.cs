namespace Unit.Tests.ProjectTests
{
    using System;
    using System.Linq;
    using FluentAssertions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using NUnit.Framework;

    public class WhenAddingAPhase
    {
        private Project project;

        [SetUp]
        public void SetUp()
        {
            this.project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 31), 0));

            this.project.AddPhase(new AddPhaseActivity("/employees/1", PhaseStatus.Planned, new DateTime(2018, 8, 31)));
        }

        [Test]
        public void TheProjectShouldHaveOnePhase()
        {
            this.project.Phases.Should().HaveCount(1);
        }

        [Test]
        public void TheAddPhaseActivityShouldBeRecorded()
        {
            this.project.Activities.Should().HaveCount(2);
            this.project.Activities.OfType<AddPhaseActivity>().Should().HaveCount(1);
        }
    }
}
