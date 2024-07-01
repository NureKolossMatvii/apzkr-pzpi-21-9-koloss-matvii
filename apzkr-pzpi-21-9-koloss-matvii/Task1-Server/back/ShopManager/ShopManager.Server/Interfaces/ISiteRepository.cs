using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface ISiteRepository : IBaseRepository<Site, int>
    {
        Task<bool> ProductCreatedForAsync(int id);
        Task<List<Site>> GetAsync(int[] ides);
    }
}
