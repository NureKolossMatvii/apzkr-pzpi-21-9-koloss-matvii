namespace ShopManager.Server.Requests
{
    public interface IPageRequest<T>
    {
        Task<PageResponse<T>> Execute(IQueryable<T> query);

        IQueryable<T> GetQueryableWithoutPagination(IQueryable<T> query);
    }
}
