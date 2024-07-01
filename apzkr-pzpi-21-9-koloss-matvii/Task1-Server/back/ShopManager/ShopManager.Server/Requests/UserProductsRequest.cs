using ShopManager.Server.Models;
using ShopManager.Server.RequestSpecifications;

namespace ShopManager.Server.Requests
{
    public class UserProductsRequest : BaseRequest<Product>
    {
        public int[] CategoryIdes { get; set; }

        public OrderField Order { get; set; }

        public override ISpecification<Product> GetFilterSpecification()
        {
            var lowerSearchString = SearchString?.ToLower();
            var search = new FilterSpecification<Product>(product => string.IsNullOrEmpty(lowerSearchString) ||
                product.Name.ToLower().Contains(lowerSearchString) ||
                product.Article.ToLower().Contains(lowerSearchString) ||
                product.Description.ToLower().Contains(lowerSearchString));


            var filter = new FilterSpecification<Product>(product => product.Published && !product.IsSaled &&
                (CategoryIdes == null || product.Categories.Any(c => CategoryIdes.Contains(c.Id) || CategoryIdes.Any(i => i == c.ParentCategoryId))));

            return new AndSpecification<Product>(filter, search);
        }

        public override ISpecification<Product> GetOrderSpecification()
        {
            switch (Order)
            {
                case OrderField.EditionDate:
                    return new OrderSpecification<Product, object>(OrderType, product => product.EditionDate);
                case OrderField.Name:
                    return new OrderSpecification<Product, object>(OrderType, product => product.Name);
            }

            throw new NotImplementedException();
        }

        public enum OrderField
        {
            EditionDate,
            Name,

        }
    }
}
