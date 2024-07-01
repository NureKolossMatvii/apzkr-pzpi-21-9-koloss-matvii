using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using ShopManager.Server.Dto;

namespace ShopManager.Server.Interfaces
{
    public interface IUserService
    {
        Task<ValidationResult> RegisterManager(UserRegisterDto adminRegisterDto);

        Task DeleteAsync(string login);

        Task<List<AdminListResponse>> GetAllAsync();

        Task<IdentityResult> UpdateAdminPassword(string login, string currentPassword, string newPassword);
    }
}
