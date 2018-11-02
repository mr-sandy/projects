namespace Linn.Projects.Domain.Activities
{
    public class RemovePhaseActivity : Activity
    {
        // For EF
        private RemovePhaseActivity()
        {
        }

        public RemovePhaseActivity(string employeeUrl, int phaseNumber)
            : base(employeeUrl)
        {
            this.PhaseNumber = phaseNumber;
        }

        public int PhaseNumber { get; private set; }
    }
}