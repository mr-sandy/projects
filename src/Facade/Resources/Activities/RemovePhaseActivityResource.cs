namespace Linn.Projects.Facade.Resources.Activities
{
    public class RemovePhaseActivityResource : ActivityResource
    {
        public override string Type => "remove-phase";

        public int PhaseNumber { get; set; }
    }
}