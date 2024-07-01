using FluentValidation.Results;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;
using ShopManager.Server.Models;
using ShopManager.Server.Validators;
using System.Data;
using System.Threading;

namespace ShopManager.Server.Services
{
    public class UserService : IUserService
    {
        private readonly AdminRegisterValidator _validator;
        private readonly UserManager<Admin> _userManager;
        private readonly RoleManager<Admin> _roleManager;

        public UserService(AdminRegisterValidator validator, UserManager<Admin> userManager)
        {
            _validator = validator;
            _userManager = userManager;
        }

        public async Task<ValidationResult> RegisterManager(UserRegisterDto adminRegisterDto)
        {
            var validationResult = await _validator.ValidateAsync(adminRegisterDto);

            if (validationResult.IsValid)
            {
                var user = new Admin() { UserName = adminRegisterDto.Login };
                var result = await _userManager.CreateAsync(user, adminRegisterDto.Password);

                if (result.Succeeded)
                {
                    await _userManager.AddToRoleAsync(user, Roles.Manager);
                }
            }

            return validationResult;
        }

        public async Task DeleteAsync(string login)
        {
            var user = await _userManager.FindByNameAsync(login);
            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Any(c => c == Roles.Admin))
            {
                throw new InvalidOperationException();
            }

            await _userManager.DeleteAsync(user);
        }

        public async Task<List<AdminListResponse>> GetAllAsync()
        {
            var users = await _userManager.Users.ToListAsync();
            var result = new List<AdminListResponse>();

            foreach (var user in users)
            {
                result.Add(new AdminListResponse()
                {
                    Login = user.UserName,
                    Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault()
                });
            }

            return result;
        }

        public async Task<IdentityResult> UpdateAdminPassword(string login, string currentPassword, string newPassword)
        {
            var user = await _userManager.FindByNameAsync(login);

            var result = await _userManager.ChangePasswordAsync(user, currentPassword, newPassword);

            return result;
        }
    }
}
