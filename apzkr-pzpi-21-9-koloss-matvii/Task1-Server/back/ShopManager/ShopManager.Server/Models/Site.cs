namespace ShopManager.Server.Models
{
    public class Site
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Product> Products { get; set; }
    }
}
