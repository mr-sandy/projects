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
            this.BuildPhase(builder);

            this.BuildActivity(builder);

            base.OnModelCreating(builder);
        }

        private void BuildProject(ModelBuilder builder)
        {
            builder.Entity<Project>().HasKey(p => p.Id);
            builder.Entity<Project>().Property(p => p.Name).IsRequired();
            builder.Entity<Project>().HasMany(p => p.Phases).WithOne(p => p.Project).OnDelete(DeleteBehavior.Cascade);
            builder.Entity<Project>().HasMany(p => p.Activities).WithOne().OnDelete(DeleteBehavior.Cascade);
        }

        private void BuildPhase(ModelBuilder builder)
        {
            builder.Entity<Phase>().HasKey(p => p.Id);
            builder.Entity<Phase>().Property(p => p.PhaseNumber).IsRequired();
        }

        private void BuildActivity(ModelBuilder builder)
        {
            builder.Entity<Activity>().HasKey(h => h.Id);
            builder.Entity<Activity>().HasDiscriminator<string>("ActivityType")
                .HasValue<CreateActivity>("create-project")
                .HasValue<UpdateActivity>("update-project")
                .HasValue<AddPhaseActivity>("add-phase")
                .HasValue<UpdatePhaseActivity>("update-phase")
                .HasValue<RemovePhaseActivity>("remove-phase");

            builder.Entity<CreateActivity>().HasBaseType<Activity>();
            builder.Entity<UpdateActivity>().HasBaseType<Activity>();
            builder.Entity<AddPhaseActivity>().HasBaseType<Activity>();
            builder.Entity<UpdatePhaseActivity>().HasBaseType<Activity>();
            builder.Entity<RemovePhaseActivity>().HasBaseType<Activity>();
        }
    }
}
