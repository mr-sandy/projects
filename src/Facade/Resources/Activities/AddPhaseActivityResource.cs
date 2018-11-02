namespace Linn.Projects.Facade.Resources.Activities
{
    using System;

    public class AddPhaseActivityResource : ActivityResource
    {
        public override string Type => "add-phase";

        public int PhaseNumber { get; set; }

        public string Status { get; set; }

        public DateTime EndDate { get; set; }
    }
}