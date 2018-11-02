namespace Linn.Projects.Domain
{
    using System;
    using Linn.Projects.Domain.Activities;

    public class Phase
    {
        // For EF
        private Phase()
        {
        }

        public Phase(Project project, int phaseNumber, PhaseStatus status, DateTime endDate)
        {
            this.Project = project;
            this.PhaseNumber = phaseNumber;
            this.Status = status;
            this.EndDate = endDate;
        }

        public int Id { get; set; }

        public Project Project { get; private set; }

        public int PhaseNumber { get; private set; }

        public PhaseStatus Status { get; private set; }

        public DateTime EndDate { get; private set; }

        public void Update(UpdatePhaseActivity activity)
        {
            activity.PreviousStatus = this.Status;
            activity.PreviousEndDate = this.EndDate;

            this.Status = activity.Status;
            this.EndDate = activity.EndDate;
        }
    }
}