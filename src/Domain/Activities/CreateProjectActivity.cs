namespace Linn.Projects.Domain.Activities
{
    public class CreateProjectActivity : ProjectActivity
    {
        public CreateProjectActivity(string employeeUrl)
            : base(employeeUrl)
        {
        }

        public string Name { get; set; }
    }
}