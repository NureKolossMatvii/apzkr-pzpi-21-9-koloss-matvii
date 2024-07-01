using ShopManager.Server.Images;
using ShopManager.Server.Interfaces;
using System.Reflection;

namespace ShopManager.Server.Services
{
    public class ImageService : IImageService
    {
        private readonly string _imagesDirectory = Path.GetDirectoryName(typeof(ImagesFolderMark).Assembly.Location);

        public async Task SaveAsync(IFormFile formFile, Guid id)
        {
            var path = Path.Combine( _imagesDirectory, id + ".webp");
            using var file = File.Create(path);
            await formFile.CopyToAsync(file);
        }

        public async Task<byte[]> GetAsync(Guid id)
        {
            var path = Path.Combine(_imagesDirectory, id + ".webp");
            using var streamReader = File.OpenRead(path);
            var data = new byte[streamReader.Length];

            await streamReader.ReadAsync(data, 0, data.Length);

            return data;
        }


        public async void Delete(Guid id)
        {
            var path = Path.Combine(_imagesDirectory, id + ".webp");
            File.Delete(path);
        }
    }
}
