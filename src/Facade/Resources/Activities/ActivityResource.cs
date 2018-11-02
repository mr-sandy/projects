namespace Linn.Projects.Facade.Resources.Activities
{
    using System;

    public abstract class ActivityResource
    {
        public DateTime ActivityDate { get; set; }

        public string EmployeeUrl { get; set; }

        public abstract string Type { get; }
    }
}