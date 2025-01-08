namespace CompanyContactsHub.Data
{
    public class Contact
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Role { get; set; }

        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}