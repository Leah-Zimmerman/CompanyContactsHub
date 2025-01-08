using System.Text.Json.Serialization;

namespace CompanyContactsHub.Data
{
    public class Company
    {
        public int Id { get; set; }
        public int Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

        [JsonIgnore]
        public List<Contact> Contacts { get; set; } = new();
    }
}