namespace Linn.Projects.Domain.Activities
{
    public abstract class ProjectActivity
    {
        // For EF
        protected ProjectActivity()
        {
        }

        protected ProjectActivity(string employeeUrl)
        {
            this.EmployeeUrl = employeeUrl;
        }

        public int Id { get; set; }

        public string EmployeeUrl { get; private set; }
    }
}