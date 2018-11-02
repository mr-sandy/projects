namespace Linn.Projects.Domain.Activities
{
    using System;

    public class AddPhaseActivity : Activity
    {
        // For EF
        private AddPhaseActivity()
        {
        }

        public AddPhaseActivity(string employeeUrl, PhaseStatus status, DateTime endDate)
            : base(employeeUrl)
        {
            this.Status = status;
            this.EndDate = endDate;
        }

        public PhaseStatus Status { get; private set; }

        public DateTime EndDate { get; private set; }

        public int PhaseNumber { get; set; }
    }
}