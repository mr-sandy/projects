namespace Linn.Projects.Facade.Extensions
{
    using Linn.Projects.Domain;
    using Linn.Projects.Facade.Resources;

    public static class PhaseStatusExtensions
    {
        public static string ToResource(this PhaseStatus phaseStatus)
        {
            switch (phaseStatus)
            {
                case PhaseStatus.Planned:
                    return PhaseStatusResource.Planned;

                case PhaseStatus.InProgress:
                    return PhaseStatusResource.InProgress;

                case PhaseStatus.Complete:
                    return PhaseStatusResource.Complete;

                case PhaseStatus.AtRisk:
                    return PhaseStatusResource.AtRisk;

                case PhaseStatus.Late:
                    return PhaseStatusResource.Late;

                default:
                    return "";
            }
        }
    }
}