using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Repositories
{
    public class SiteRepository : BaseRepository<Site, int>, ISiteRepository
    {
        public SiteRepository(AppDbContext appDbContext) : base(appDbContext)
        {
        }

        public async Task<bool> ProductCreatedForAsync(int id)
        {
            return await _appDbContext.Sites.AnyAsync(s => s.Id == id && s.Products.Count > 0);
        }

        public async Task<List<Site>> GetAsync(int[] ides)
        {
            return await _appDbContext.Sites
                .Where(c => ides.Any(i => i == c.Id))
                .ToListAsync();
        }

        public override Task<List<Site>> GetAllAsync()
        {
            return _appDbContext.Sites.ToListAsync();
        }

        public override async Task<Site> GetByIdAsync(int id)
        {
            return await _appDbContext.Sites.FindAsync(id);
        }
    }
}
