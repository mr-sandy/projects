namespace Linn.Projects.Domain
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Linn.Projects.Domain.Activities;

    public class Project
    {
        private readonly List<Phase> phases = new List<Phase>();
        private readonly List<Activity> activities = new List<Activity>();

        public static Project Build(CreateActivity activity)
        {
            var project = new Project(activity);
            
            for (var i = 0; i < activity.Phases; i++)
            {
                project.phases.Add(new Phase(project, i, PhaseStatus.Planned, project.StartDate.AddMonths(i + 1)));
            }

            return project;
        }

        // For EF
        private Project()
        {
        }

        public Project(CreateActivity activity)
        {
            this.Name = activity.Name;
            this.StartDate = activity.StartDate;

            this.activities.Add(activity);
        }

        public int Id { get; set; }

        public string Name { get; private set; }

        public DateTime StartDate { get; set; }

        public IEnumerable<Phase> Phases => this.phases;

        public IEnumerable<Activity> Activities => this.activities;

        public Phase AddPhase(AddPhaseActivity activity)
        {
            var phaseNumber = this.phases.Count;

            var phase = new Phase(this, phaseNumber, activity.Status, activity.EndDate);

            this.phases.Add(phase);

            activity.PhaseNumber = phase.PhaseNumber;

            this.activities.Add(activity);

            return phase;
        }

        public Phase UpdatePhase(UpdatePhaseActivity activity)
        {
            var phase = this.phases.SingleOrDefault(p => p.PhaseNumber == activity.PhaseNumber);

            if (phase == null)
            {
                return null;
            }

            phase.Update(activity);

            this.activities.Add(activity);

            return phase;
        }

        public Phase RemovePhase(RemovePhaseActivity activity)
        {
            var phase = this.phases.SingleOrDefault(p => p.PhaseNumber == activity.PhaseNumber);

            if (phase == null)
            {
                return null;
            }

            this.phases.Remove(phase);

            this.activities.Add(activity);

            return phase;
        }

        public void Update(UpdateActivity activity)
        {
            activity.PreviousName = this.Name;
            activity.PreviousStartDate = this.StartDate;

            this.Name = activity.Name;
            this.StartDate = activity.StartDate;

            this.activities.Add(activity);
        }
    }
}
