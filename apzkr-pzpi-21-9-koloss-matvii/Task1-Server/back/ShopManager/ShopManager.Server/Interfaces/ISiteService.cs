using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface ISiteService
    {
        Task CreateAsync(Site site);

        Task<bool> TryDeleteAsync(int id);

        Task<List<Site>> GetAllAsync();

        Task EditAsync(Site site);
    }
}
