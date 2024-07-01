using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Dto
{
    public class ProductCreationDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string? Description { get; set; }

        public string Article { get; set; }

        public bool Published { get; set; }

        public bool IsSaled { get; set; }

        public int PurchasePrice { get; set; }

        public int SalePrice { get; set; }
        public string? InstagramLink { get; set; }

        public string? TrackNumber { get; set; }

        public string? Location { get; set; }

        public int[] SiteIdes { get; set; }

        public int[] CategoryIdes { get; set; }

        public DateTime EditionDate { get; set; }

        public DateTime CreationDate { get; set; }

        public List<ImageCreationDto> Images { get; set; }
    }
}
