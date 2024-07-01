using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Models
{
    public class Product
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        [MaxLength(8000)]
        public string? Description { get; set; }

        public string Article { get;set; }

        public bool Published { get; set; }

        public int PurchasePrice { get; set; }

        public int SalePrice { get; set; }

        public string? TrackNumber { get; set; }

        public string? Location { get; set; }
        public string? InstagramLink { get; set; }

        public bool IsSaled { get; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EditionDate { get; set; }

        public List<Site> Sites { get; set; }

        public List<Image> Images { get; set; }

        public List<Category> Categories { get; set; }
    }
}
