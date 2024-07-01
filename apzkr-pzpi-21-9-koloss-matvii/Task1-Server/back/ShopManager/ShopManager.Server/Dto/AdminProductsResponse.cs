using ShopManager.Server.Models;
using ShopManager.Server.Requests;

namespace ShopManager.Server.Dto
{
    public class AdminProductsResponse
    {
        public PageResponse<Product> PageInfo { get; set; }

        public int Profit {  get; set; }
    }
}
