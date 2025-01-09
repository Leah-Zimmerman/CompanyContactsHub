using CompanyContactsHub.Data;
using CompanyContactsHub.Web.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CompanyContactsHub.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyHubController : ControllerBase
    {
        private string _connectionString;
        public CompanyHubController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr")!;
        }
        [HttpPost]
        [Route("addCompany")]
        public void AddCompany(Company company)
        {
            var repo = new CompanyHubRepository(_connectionString);
            repo.AddCompany(company);
        }
        [HttpGet]
        [Route("getCompanies")]
        public List<Company> GetCompanies()
        {
            var repo = new CompanyHubRepository(_connectionString);
            return repo.GetCompanies();
        }
        [HttpPost]
        [Route("deleteCompany")]
        public void DeleteCompany(IdClass ic)
        {
            var repo = new CompanyHubRepository(_connectionString);
            repo.DeleteCompany(ic.Id);
        }
        [HttpPost]
        [Route("updateCompany")]
        public void UpdateCompany(Company company)
        {
            var repo = new CompanyHubRepository(_connectionString);
            repo.UpdateCompany(company);
        }
        [HttpPost]
        [Route("addContactToCompany")]
        public void AddContactToCompany(Contact contact)
        {
            var repo = new CompanyHubRepository(_connectionString);
            repo.AddContactToCompany(contact);
        }
        [HttpPost]
        [Route("deleteContact")]
        public void DeleteContact(int id)
        {
            var repo = new CompanyHubRepository(_connectionString);
            repo.DeleteContact(id);
        }
        [HttpGet]
        [Route("getContactsForCompany")]
        public List<Contact> GetContactsForCompany(int id)
        {
            var repo = new CompanyHubRepository(_connectionString);
            return repo.GetContactsForCompany(id);
        }
        [HttpPost]
        [Route("updateContact")]
        public void UpdateContact(Contact contact)
        {
            var repo = new CompanyHubRepository(_connectionString);
            repo.UpdateContact(contact);
        }
        [HttpGet]
        [Route("getCompanyNameById")]
        public string GetCompanyNameById(int id)
        {
            var repo = new CompanyHubRepository(_connectionString);
            return repo.GetCompanyNameById(id);
        }

        public class IdClass
        { 
            public int Id { get; set; }
        }
    }
}
