using System.Text.Json.Serialization;

namespace CompanyContactsHub.Data
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        public List<Contact> Contacts { get; set; } = new();
    }
}