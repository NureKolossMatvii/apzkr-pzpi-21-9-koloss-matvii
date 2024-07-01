using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Repositories;

namespace ShopManager.Server.Services
{
    public class SiteService : ISiteService
    {
        private readonly ISiteRepository _siteRepository;

        public SiteService(ISiteRepository siteRepository)
        {
            _siteRepository = siteRepository;
        }

        public async Task<bool> TryDeleteAsync(int id)
        {
            var canBeDeleted = !await _siteRepository.ProductCreatedForAsync(id);

            if (canBeDeleted)
            {
                var site = await _siteRepository.GetByIdAsync(id);
                await _siteRepository.DeleteAsync(site);
                return true;
            }

            return false;
        }

        public async Task CreateAsync(Site site)
        {
            await _siteRepository.CreateAsync(site);
        }

        public async Task<List<Site>> GetAllAsync()
        {
            return await _siteRepository.GetAllAsync();
        }

        public async Task EditAsync(Site site)
        {
            await _siteRepository.EditAsync(site);
        }
    }
}
