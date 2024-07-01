using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Dto;
using ShopManager.Server.Models;

namespace ShopManager.Server.Validators
{
    public class AdminRegisterValidator : AbstractValidator<UserRegisterDto>
    {
        public AdminRegisterValidator(UserManager<Admin> userManager)
        {
            RuleFor(c => c.Login)
                .Length(5, 10)
                .WithMessage("Login length should be between 5 and 10 characters.");

            RuleFor(c => c.Password)
                .Length(6, 15)
                .WithMessage("Password length should be between 6 and 15 characters.");

            RuleFor(c => c.ConfirmPassword)
                .Equal(c => c.Password)
                .WithMessage("Password and Confirm Password do not match.");

            RuleFor(c => c.Login)
                .MustAsync(async (login, cancellation) =>
                {
                    var users = await userManager.Users.ToListAsync();
                    var user = await userManager.FindByNameAsync(login);
                    return user == null;
                })
                .WithMessage("This login is already in use.");
        }
    }
}
