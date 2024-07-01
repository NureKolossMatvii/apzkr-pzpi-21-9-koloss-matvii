
using System.Linq.Expressions;

namespace ShopManager.Server.RequestSpecifications
{
    public class FilterSpecification<T> : ISpecification<T>
    {
        private readonly Expression<Func<T, bool>> _predicate;

        public FilterSpecification(Expression<Func<T, bool>> predicate)
        {
            _predicate = predicate;
        }

        public IQueryable<T> Specify(IQueryable<T> query)
        {
            return query.Where(_predicate);
        }
    }
}
