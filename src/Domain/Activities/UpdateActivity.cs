namespace Linn.Projects.Domain.Activities
{
    using System;

    public class UpdateActivity : Activity
    {
        // For EF
        private UpdateActivity()
        {
        }

        public UpdateActivity(string employeeUrl, string name, DateTime startDate)
            : base(employeeUrl)
        {
            this.Name = name;
            this.StartDate = startDate;
        }

        public string Name { get; private set; }

        public DateTime StartDate { get; private set; }

        public string PreviousName { get; set; }

        public DateTime PreviousStartDate { get; set; }
    }
}