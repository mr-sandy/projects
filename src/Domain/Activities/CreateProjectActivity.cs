namespace Linn.Projects.Domain.Activities
{
    public class CreateProjectActivity : ProjectActivity
    {
        // For EF
        private CreateProjectActivity()
        {
        }

        public CreateProjectActivity(string employeeUrl)
            : base(employeeUrl)
        {
        }

        public string Name { get; set; }
    }
}