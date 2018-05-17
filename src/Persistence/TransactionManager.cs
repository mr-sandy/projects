namespace Linn.Projects.Persistence
{
    using Linn.Projects.Domain.Repositories;

    public class TransactionManager : ITransactionManager
    {
        private readonly ServiceDbContext serviceDbContext;

        public TransactionManager(ServiceDbContext serviceDbContext)
        {
            this.serviceDbContext = serviceDbContext;
        }

        public void Commit()
        {
            this.serviceDbContext.SaveChanges();
        }
    }
}