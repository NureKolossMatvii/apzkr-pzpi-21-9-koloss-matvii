using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShopManager.Server.Authorization.Interfaces;
using ShopManager.Server.Dto;
using ShopManager.Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ShopManager.Server.Authorization.Services
{
    internal class SignInService : ISignInService
    {
        private readonly SignInManager<Admin> _signInManager;
        private readonly IJwtService _jwtService;
        private readonly UserManager<Admin> _userManager;

        public SignInService(IJwtService jwtService, SignInManager<Admin> signInManager, UserManager<Admin> userManager)
        {
            _jwtService = jwtService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<string> SignIn(AdminSignInDto userSignInDto)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(c => c.UserName == userSignInDto.Login);
            var userCanSignIn = await UserCanSignIn(user, userSignInDto.Password);

            if (userCanSignIn)
            {
                var role = await _userManager.GetRolesAsync(user);
                var token = _jwtService.CreateToken(user.UserName, role.First());
                return token;
            }

            throw new InvalidOperationException("Password or login entered incorectly");
        }

        private async Task<bool> UserCanSignIn(Admin? user, string password)
        {
            if (user != null)
            {
                var signInResult = await _signInManager.CheckPasswordSignInAsync(user, password, false);
                return signInResult.Succeeded;
            }

            return false;
        }
    }
}
