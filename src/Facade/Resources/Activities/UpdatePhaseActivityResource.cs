namespace Linn.Projects.Facade.Resources.Activities
{
    using System;

    public class UpdatePhaseActivityResource : ActivityResource
    {
        public override string Type => "update-phase";

        public int PhaseNumber { get; set; }

        public string Status { get; set; }

        public DateTime EndDate { get; set; }

        public string PreviousStatus { get; set; }

        public DateTime PreviousEndDate { get; set; }
    }
}