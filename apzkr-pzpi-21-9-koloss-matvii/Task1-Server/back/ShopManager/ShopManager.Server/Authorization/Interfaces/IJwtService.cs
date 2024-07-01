namespace ShopManager.Server.Authorization.Interfaces
{
    public interface IJwtService
    {
        string CreateToken(string userName, string role);
    }
}
