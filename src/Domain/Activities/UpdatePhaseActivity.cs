namespace Linn.Projects.Domain.Activities
{
    using System;

    public class UpdatePhaseActivity : Activity
    {
        // For EF
        private UpdatePhaseActivity()
        {
        }

        public UpdatePhaseActivity(string employeeUrl, int phaseNumber, PhaseStatus status, DateTime endDate)
            : base(employeeUrl)
        {
            this.PhaseNumber = phaseNumber;
            this.Status = status;
            this.EndDate = endDate;
        }

        public int PhaseNumber { get; private set; }

        public PhaseStatus Status { get; private set; }

        public DateTime EndDate { get; private set; }

        public PhaseStatus PreviousStatus { get; set; }

        public DateTime PreviousEndDate { get; set; }
    }
}