namespace ShopManager.Server.RequestSpecifications
{
    public interface ISpecification<T>
    {
        IQueryable<T> Specify(IQueryable<T> query);
    }
}
