namespace ShopManager.Server.Requests
{
    public class PageResponse<T>
    {
        public List<T> PageItems { get; set; }
        public int ItemsCount { get; set; }
    }
}
