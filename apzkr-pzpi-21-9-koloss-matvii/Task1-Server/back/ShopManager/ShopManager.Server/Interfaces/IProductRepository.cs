using ShopManager.Server.Models;
using ShopManager.Server.Requests;
using ShopManager.Server.RequestSpecifications;
using System.Linq.Expressions;

namespace ShopManager.Server.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product, Guid>
    {
        public Task<Product> GetByIdAsync(Guid id, Expression<Func<Product, bool>> predicate);

        Task<PageResponse<Product>> GetAllAsync(IPageRequest<Product> request);

        Task<string> GenerateArticle();

        Task<bool> ArticleExists(string article);

        Task<int> GetProfit(IPageRequest<Product> request);
    }
}
