namespace Linn.Projects.Domain.Activities
{
    public abstract class ProjectActivity
    {
        protected ProjectActivity(string employeeUrl)
        {
            this.EmployeeUrl = employeeUrl;
        }

        public string EmployeeUrl { get; private set; }
    }
}