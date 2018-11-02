namespace Unit.Tests.ProjectTests
{
    using System;
    using System.Linq;
    using FluentAssertions;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using NUnit.Framework;

    public class WhenUpdatingAPhase
    {
        private Project project;
        private UpdatePhaseActivity activity;

        [SetUp]
        public void SetUp()
        {
            this.project = new Project(new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 31), 0));
            this.project.AddPhase(new AddPhaseActivity("/employees/1", PhaseStatus.InProgress, new DateTime(2018, 8, 31)));

            this.activity = new UpdatePhaseActivity("/employees/1", 0, PhaseStatus.Late, new DateTime(2018, 9, 30));

            this.project.UpdatePhase(this.activity);
        }

        [Test]
        public void TheProjectShouldHaveOnePhase()
        {
            this.project.Phases.Should().HaveCount(1);
        }

        [Test]
        public void ThePhaseShouldBeUpdated()
        {
            var phase = this.project.Phases.ElementAt(0);

            phase.Status.Should().Be(PhaseStatus.Late);
        }

        [Test]
        public void TheActivityShouldRecordThePreviousValues()
        {
            this.activity.PreviousStatus.Should().Be(PhaseStatus.InProgress);
            this.activity.PreviousEndDate.Should().Be(new DateTime(2018, 8, 31));
        }

        [Test]
        public void TheAddPhaseActivityShouldBeRecorded()
        {
            this.project.Activities.Should().HaveCount(3);
            this.project.Activities.OfType<UpdatePhaseActivity>().Should().HaveCount(1);
        }
    }
}