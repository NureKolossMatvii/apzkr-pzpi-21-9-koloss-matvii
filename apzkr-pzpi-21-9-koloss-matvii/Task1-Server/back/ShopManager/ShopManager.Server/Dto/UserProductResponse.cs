using ShopManager.Server.Models;
using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Dto
{
    public class UserProductResponse
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        [MaxLength(2000)]
        public string Description { get; set; }

        public string Article { get; set; }

        public int PurchasePrice { get; set; }

        public int SalePrice { get; set; }
        public string InstagramLink { get ; set; }

        public DateTime CreationDate { get; set; }

        public DateTime EditionDate { get; set; }

        public List<Image> Images { get; set; }

        public List<Category> Categories { get; set; }
    }
}
