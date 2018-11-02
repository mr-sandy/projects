namespace Linn.Projects.Domain.Activities
{
    using System;

    public class CreateActivity : Activity
    {
        // For EF
        private CreateActivity()
        {
        }

        public CreateActivity(string employeeUrl, string name, DateTime startDate, int phases)
            : base(employeeUrl)
        {
            this.Name = name;
            this.StartDate = startDate;
            this.Phases = phases;
        }

        public string Name { get; private set; }

        public DateTime StartDate { get; private set; }

        public int Phases { get; private set; }
    }
}