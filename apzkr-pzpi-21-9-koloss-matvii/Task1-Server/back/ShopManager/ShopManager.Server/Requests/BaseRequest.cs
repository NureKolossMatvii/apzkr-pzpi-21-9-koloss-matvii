using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Models;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Requests
{
    public abstract class BaseRequest<T> : IPageRequest<T>
    {
        public int Take { get; set; }

        public int Skip { get; set; }

        public string? SearchString { get; set; }

        private ISpecification<T> GetPaginationSpecification()
        {
            var paginationSpecification = new PaginationSpecification<T>(Skip, Take);
            return paginationSpecification;
        }

        public abstract ISpecification<T> GetOrderSpecification();
        public abstract ISpecification<T> GetFilterSpecification();


        public async Task<PageResponse<T>> Execute(IQueryable<T> query)
        {
            return new PageResponse<T>()
            {
                ItemsCount = await GetOrderSpecification()
                    .Specify(GetFilterSpecification().Specify(query)).CountAsync(),
                PageItems = await GetPaginationSpecification()
                    .Specify(GetOrderSpecification()
                        .Specify(GetFilterSpecification().Specify(query))).ToListAsync()
            };
        }

        public IQueryable<T> GetQueryableWithoutPagination(IQueryable<T> query)
        {
            return GetOrderSpecification()
                    .Specify(GetFilterSpecification().Specify(query));
        }

        public OrderType OrderType { get; set; }
    }
}
