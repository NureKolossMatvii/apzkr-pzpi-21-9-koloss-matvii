using ShopManager.Server.Dto;

namespace ShopManager.Server.Authorization.Interfaces
{
    public interface ISignInService
    {
        Task<string> SignIn(AdminSignInDto userSignInDto);
    }
}
