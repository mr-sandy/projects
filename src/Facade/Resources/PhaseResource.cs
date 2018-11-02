namespace Linn.Projects.Facade.Resources
{
    using System;
    using Linn.Common.Resources;

    public class PhaseResource : HypermediaResource
    {
        public int PhaseNumber { get; set; }

        public string Status { get; set; }

        public DateTime EndDate { get; set; }
    }
}