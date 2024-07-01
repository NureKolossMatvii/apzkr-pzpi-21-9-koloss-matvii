
namespace ShopManager.Server.RequestSpecifications
{
    public class PaginationSpecification<T> : ISpecification<T>
    {
        private readonly int _skip;
        private readonly int _take;

        public PaginationSpecification(int skip, int take)
        {
            _skip = skip;
            _take = take;
        }

        public IQueryable<T> Specify(IQueryable<T> query)
        {
            return query.Skip(_skip).Take(_take);
        }
    }
}
