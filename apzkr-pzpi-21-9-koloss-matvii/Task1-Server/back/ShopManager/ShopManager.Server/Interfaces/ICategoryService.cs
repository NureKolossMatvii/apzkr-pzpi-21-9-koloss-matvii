using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface ICategoryService
    {
        Task CreateAsync(Category category);

        Task<List<Category>> GetAllAsync();

        Task<bool> TryDeleteAsync(int id);

        Task EditAsync(Category category);

        Task<List<Category>> GetWithoutParent();
    }
}
