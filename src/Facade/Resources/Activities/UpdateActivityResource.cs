namespace Linn.Projects.Facade.Resources.Activities
{
    using System;

    public class UpdateActivityResource : ActivityResource
    {
        public override string Type => "update";

        public string Name { get; set; }

        public DateTime StartDate { get; set; }

        public string PreviousName { get; set; }

        public DateTime PreviousStartDate { get; set; }
    }
}