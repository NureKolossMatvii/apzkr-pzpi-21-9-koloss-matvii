
using ShopManager.Server.Models;
using System.Linq.Expressions;

namespace ShopManager.Server.RequestSpecifications
{
    public class OrderSpecification<T, TKey> : ISpecification<T>
    {
        private readonly OrderType _orderType;
        private readonly Expression<Func<T, TKey>> _keySelector;

        public OrderSpecification(OrderType orderType, Expression<Func<T, TKey>> keySelector)
        {
            _orderType = orderType;
            _keySelector = keySelector;
        }

        public IQueryable<T> Specify(IQueryable<T> query)
        {
            if(_orderType == OrderType.Ascending)
            {
                return query.OrderBy(_keySelector);
            }

            return query.OrderByDescending(_keySelector);
        }
    }
}
