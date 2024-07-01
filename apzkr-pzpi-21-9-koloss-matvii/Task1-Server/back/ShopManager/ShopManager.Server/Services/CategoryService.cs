using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;

namespace ShopManager.Server.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _categoryRepository = categoryRepository;
        }

        public async Task CreateAsync(Category category)
        {
            await _categoryRepository.CreateAsync(category);
        }

        public async Task EditAsync(Category category)
        {
            await _categoryRepository.EditAsync(category);
        }

        public async Task<bool> TryDeleteAsync(int id)
        {
            var canBeDeleted = !await _categoryRepository.ProductCreatedForOrIsParentAsync(id);

            if (canBeDeleted)
            {
                var category = await _categoryRepository.GetByIdAsync(id);
                await _categoryRepository.DeleteAsync(category);
                return true;
            }

            return false;
        }

        public async Task<List<Category>> GetAllAsync()
        {
            return await _categoryRepository.GetAllAsync();
        }

        public async Task<List<Category>> GetWithoutParent()
        {
            return await _categoryRepository.GetWithoutParentCategories();
        }
    }
}
