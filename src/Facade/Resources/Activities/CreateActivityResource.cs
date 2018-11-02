namespace Linn.Projects.Facade.Resources.Activities
{
    using System;

    public class CreateActivityResource : ActivityResource
    {
        public override string Type => "create";

        public string Name { get; set; }

        public DateTime StartDate { get; set; }
    }
}