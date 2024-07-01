using ShopManager.Server.Interfaces;

namespace ShopManager.Server.Repositories
{
    public abstract class BaseRepository<TEntity, TKey> : IBaseRepository<TEntity, TKey> where TEntity : class
    {
        protected readonly AppDbContext _appDbContext;

        public BaseRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task CreateAsync(TEntity entity)
        {
            _appDbContext.Add(entity);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(TEntity entity)
        {
            _appDbContext.Remove(entity);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditAsync(TEntity entity)
        {
            _appDbContext.Update(entity);
            await _appDbContext.SaveChangesAsync();
        }

        public abstract Task<List<TEntity>> GetAllAsync();

        public abstract Task<TEntity> GetByIdAsync(TKey id);
    }
}
