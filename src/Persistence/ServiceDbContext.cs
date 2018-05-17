namespace Linn.Projects.Persistence
{
    using Linn.Common.Configuration;
    using Linn.Projects.Domain;
    using Linn.Projects.Domain.Activities;
    using Linn.Projects.Persistence.Extensions;
    using Microsoft.EntityFrameworkCore;

    public class ServiceDbContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var host = ConfigurationManager.Configuration["DATABASE_HOST"];
            var databaseName = ConfigurationManager.Configuration["DATABASE_NAME"];
            var userId = ConfigurationManager.Configuration["DATABASE_USER_ID"];
            var password = ConfigurationManager.Configuration["DATABASE_PASSWORD"];

            optionsBuilder.UseNpgsql($"User ID={userId};Password={password};Host={host};Database={databaseName};Port=5432;Pooling=true;");

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RemovePluralizingTableNameConvention();

            this.BuildProject(builder);
            this.BuildProjectActivity(builder);

            base.OnModelCreating(builder);
        }

        private void BuildProject(ModelBuilder builder)
        {
            builder.Entity<Project>().HasKey(d => d.Id);
            builder.Entity<Project>().HasMany(d => d.Activities).WithOne().OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Project>().Property(d => d.Name).IsRequired();
        }

        private void BuildProjectActivity(ModelBuilder builder)
        {
            builder.Entity<ProjectActivity>().HasKey(h => h.Id);
            builder.Entity<ProjectActivity>().HasDiscriminator<string>("ActivityType")
                .HasValue<CreateProjectActivity>("create-project");

            builder.Entity<CreateProjectActivity>().HasBaseType<ProjectActivity>();
        }
    }
}
