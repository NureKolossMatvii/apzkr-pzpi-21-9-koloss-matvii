namespace ShopManager.Server.RequestSpecifications
{
    public class AndSpecification<T> : ISpecification<T>
    {
        private readonly ISpecification<T> _first;
        private readonly ISpecification<T> _second;

        public AndSpecification(ISpecification<T> first, ISpecification<T> second)
        {
            _first = first;
            _second = second;
        }

        public IQueryable<T> Specify(IQueryable<T> query)
        {
            return _second.Specify(_first.Specify(query));
        }
    }
}
