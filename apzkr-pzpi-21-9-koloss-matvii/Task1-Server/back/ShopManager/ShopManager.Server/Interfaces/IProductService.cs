using ShopManager.Server.Dto;
using ShopManager.Server.Models;
using ShopManager.Server.Requests;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Interfaces
{
    public interface IProductService
    {
        Task CreateAsync(ProductCreationDto productCreation);

        Task<string> GenerateArticle();

        Task<PageResponse<Product>> GetAllAsync(IPageRequest<Product> specification);
        Task<Product> Get(Guid id);
        Task DeleteAsync(Guid id);

        Task<Product> GetPublishedNotSaledAsync(Guid id);

        Task<int> GetProfitAsync(IPageRequest<Product> specification);
    }
}
