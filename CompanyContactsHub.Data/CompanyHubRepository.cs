using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace CompanyContactsHub.Data
{
    public class CompanyHubRepository
    {
        private string _connectionString;
        public CompanyHubRepository(string connectionString)
        {
            _connectionString = connectionString;
        }
        public void AddCompany(Company company)
        {
            using var context = new CompaniesDbContext(_connectionString);
            context.Companies.Add(company);
            context.SaveChanges();
        }
        public List<Company> GetCompanies()
        {
            using var context = new CompaniesDbContext(_connectionString);
            return context.Companies.Include(c => c.Contacts).ToList();
        }
        public void DeleteCompany(int id)
        {
            using var context = new CompaniesDbContext(_connectionString);
            var companyToDelete = context.Companies.FirstOrDefault(c => c.Id == id);
            context.Companies.Remove(companyToDelete);
            context.SaveChanges();
        }
        public void UpdateCompany(Company company)
        {
            using var context = new CompaniesDbContext(_connectionString);
            var companyToUpdate = context.Companies.FirstOrDefault(c => c.Id == company.Id);
            if (companyToUpdate != null)
            {
                companyToUpdate.Name = company.Name;
                companyToUpdate.Address = company.Address;
                companyToUpdate.PhoneNumber = company.PhoneNumber;
                context.SaveChanges();
            }
        }

        public void AddContactToCompany(Contact contact)
        {
            using var context = new CompaniesDbContext(_connectionString);
            context.Contacts.Add(new Contact
            {
                Name = contact.Name,
                PhoneNumber = contact.PhoneNumber,
                Role = contact.Role,
                CompanyId = contact.CompanyId
            });
            context.SaveChanges();
        }

        public List<Contact> GetContactsForCompany(int companyId)
        {
            using var context = new CompaniesDbContext(_connectionString);
            return context.Contacts.Where(ct => ct.CompanyId == companyId).ToList();
                    }
        public void DeleteContact(int id)
        {
            using var context = new CompaniesDbContext(_connectionString);
            var contactToDelete = context.Contacts.FirstOrDefault(c => c.Id == id);
            context.Contacts.Remove(contactToDelete);
            context.SaveChanges();
        }
        public void UpdateContact(Contact contact)
        {
            using var context = new CompaniesDbContext(_connectionString);
            var contactToUpdate = context.Contacts.FirstOrDefault(c => c.Id == contact.Id);
            if (contactToUpdate != null)
            {
                contactToUpdate.Name = contact.Name;
                contactToUpdate.Role = contact.Role;
                contactToUpdate.PhoneNumber = contact.PhoneNumber;
                context.SaveChanges();
            }
        }
        public string GetCompanyNameById(int id)
        {
            using var context = new CompaniesDbContext(_connectionString);
            var company = context.Companies.FirstOrDefault(c => c.Id == id);
            if(company == null)
            {
                return null;
            }
            return company.Name;
        }
    }
}