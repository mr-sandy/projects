namespace Linn.Projects.Domain.Activities
{
    using System;

    public abstract class Activity
    {
        // For EF
        protected Activity()
        {
        }

        protected Activity(string employeeUrl)
        {
            this.EmployeeUrl = employeeUrl;
        }

        public int Id { get; set; }

        public DateTime ActivityDate { get; private set; } = DateTime.Now;

        public string EmployeeUrl { get; private set; }
    }
}