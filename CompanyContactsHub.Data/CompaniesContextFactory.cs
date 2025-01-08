using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace CompanyContactsHub.Data
{
    public class CompaniesContextFactory : IDesignTimeDbContextFactory<CompaniesDbContext>
    {
        public CompaniesDbContext CreateDbContext(string[] args)
        {
            var config = new ConfigurationBuilder()
                .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(), $"..{Path.DirectorySeparatorChar}CompanyContactsHub.Web"))
                .AddJsonFile("appsettings.json")
                .AddJsonFile("appsettings.local.json", optional: true, reloadOnChange: true).Build();

            return new CompaniesDbContext(config.GetConnectionString("ConStr"));
        }
    }
}