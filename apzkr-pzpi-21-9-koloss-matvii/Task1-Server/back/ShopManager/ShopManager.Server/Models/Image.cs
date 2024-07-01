using System.ComponentModel.DataAnnotations;

namespace ShopManager.Server.Models
{
    public class Image
    {
        [Key]
        public Guid Id { get; set; }

        public int Index { get; set; }
    }
}
