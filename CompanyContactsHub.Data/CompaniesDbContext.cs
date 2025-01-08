using Microsoft.EntityFrameworkCore;

namespace CompanyContactsHub.Data
{
    public class CompaniesDbContext : DbContext
    {
        private string _connectionString;
        public CompaniesDbContext(string connectionString)
        {
            _connectionString = connectionString;
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_connectionString);
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>()
                .HasOne(c => c.Company)
                .WithMany(cy => cy.Contacts)
                .HasForeignKey(c => c.CompanyId)
                .IsRequired();
        }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Contact> Contacts { get; set; }
    }
}