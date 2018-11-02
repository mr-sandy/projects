namespace Linn.Projects.Facade.Extensions
{
    using System;
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;

    public static class StringExtensions
    {
        public static PhaseStatus ToPhaseStatus(this string str)
        {
            switch (str)
            {
                case PhaseStatusResource.Planned:
                    return PhaseStatus.Planned;

                case PhaseStatusResource.InProgress:
                    return PhaseStatus.InProgress;

                case PhaseStatusResource.Complete:
                    return PhaseStatus.Complete;

                case PhaseStatusResource.AtRisk:
                    return PhaseStatus.AtRisk;

                case PhaseStatusResource.Late:
                    return PhaseStatus.Late;

                default:
                    throw new Exception($"Unknown phase status '{str}'");
            }
        }
    }
}