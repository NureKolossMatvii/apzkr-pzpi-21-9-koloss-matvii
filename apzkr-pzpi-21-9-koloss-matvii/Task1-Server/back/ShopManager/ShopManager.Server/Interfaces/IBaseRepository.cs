using ShopManager.Server.Models;

namespace ShopManager.Server.Interfaces
{
    public interface IBaseRepository<TEntity, TKey> where TEntity : class
    {
        public Task EditAsync(TEntity entity);

        public Task DeleteAsync(TEntity entity);

        public Task CreateAsync(TEntity entity);

        public Task<List<TEntity>> GetAllAsync();

        public Task<TEntity> GetByIdAsync(TKey id);
    }
}
