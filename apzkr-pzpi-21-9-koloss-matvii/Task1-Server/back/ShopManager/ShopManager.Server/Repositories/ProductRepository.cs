using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Requests;
using ShopManager.Server.RequestSpecifications;
using System.Linq.Expressions;

namespace ShopManager.Server.Repositories
{
    public class ProductRepository : BaseRepository<Product, Guid>, IProductRepository
    {
        public ProductRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<int> GetProfit(IPageRequest<Product> request)
        {
            return await request.GetQueryableWithoutPagination(_appDbContext.Products).Where(c => c.SalePrice > 0 && c.IsSaled).SumAsync(c => c.SalePrice - c.PurchasePrice);
        }

        public async Task<PageResponse<Product>> GetAllAsync(IPageRequest<Product> request)
        {
            return await request.Execute(_appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Sites)
                .Include(c => c.Images));
        }

        public async Task<string> GenerateArticle()
        {
            string newArticle;

            do
            {
                newArticle = GenerateRandomArticle();
            }
            while (await ArticleExists(newArticle));

            return newArticle;
        }

        public override Task<List<Product>> GetAllAsync()
        {
            return _appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Images)
                .ToListAsync();
        }

        private string GenerateRandomArticle()
        {
            Random rand = new Random();
            return rand.Next(100000, 999999).ToString();
        }

        public async Task<bool> ArticleExists(string article)
        {
            return await _appDbContext.Products.AnyAsync(p => p.Article == article);
        }

        public override async Task<Product> GetByIdAsync(Guid id)
        {
            return await _appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Images)
                .Include(c => c.Sites)
                .FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Product> GetByIdAsync(Guid id, Expression<Func<Product, bool>> predicate)
        {
            return await _appDbContext.Products
                .Include(c => c.Categories)
                .Include(c => c.Images)
                .Where(predicate).FirstOrDefaultAsync(c => c.Id == id);
        }
    }
}
