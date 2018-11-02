namespace Unit.Tests.ProjectTests
{
    using System;
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
            var activity = new CreateActivity("/employees/1", "Project 1", new DateTime(2018, 7, 1), 2);

            this.project = Project.Build(activity);
        }

        [Test]
        public void TheProjectNameShouldBeSet()
        {
            this.project.Name.Should().Be("Project 1");
        }

        [Test]
        public void TheProjectStartDateShouldBeSet()
        {
            this.project.StartDate.Should().Be(new DateTime(2018, 7, 1));
        }

        [Test]
        public void TheProjectShouldHaveTheRequestedNumberOfPhases()
        {
            this.project.Phases.Should().HaveCount(2);
        }

        [Test]
        public void ThePhasesShouldBeInitialised()
        {
            var phase0 = this.project.Phases.ElementAt(0);
            phase0.PhaseNumber.Should().Be(0);
            phase0.Status.Should().Be(PhaseStatus.Planned);
            phase0.EndDate.Should().Be(new DateTime(2018, 8, 1));

            var phase1 = this.project.Phases.ElementAt(1);
            phase1.PhaseNumber.Should().Be(1);
            phase1.Status.Should().Be(PhaseStatus.Planned);
            phase1.EndDate.Should().Be(new DateTime(2018, 9, 1));
        }

        [Test]
        public void TheCreateActivityShouldBeRecorded()
        {
            this.project.Activities.Should().HaveCount(1);
            this.project.Activities.OfType<CreateActivity>().Should().HaveCount(1);

            var activity = this.project.Activities.OfType<CreateActivity>().Single();
            activity.Name.Should().Be("Project 1");
            activity.StartDate.Should().Be(new DateTime(2018, 7, 1));
            activity.EmployeeUrl.Should().Be("/employees/1");
            activity.ActivityDate.Date.Should().Be(DateTime.Now.Date);
        }
    }
}
