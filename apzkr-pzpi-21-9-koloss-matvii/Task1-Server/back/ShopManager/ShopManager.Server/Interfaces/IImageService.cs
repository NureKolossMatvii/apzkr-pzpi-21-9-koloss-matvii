namespace ShopManager.Server.Interfaces
{
    public interface IImageService
    {
        Task SaveAsync(IFormFile formFile, Guid id);

        Task<byte[]> GetAsync(Guid id);

        void Delete(Guid id);
    }
}
