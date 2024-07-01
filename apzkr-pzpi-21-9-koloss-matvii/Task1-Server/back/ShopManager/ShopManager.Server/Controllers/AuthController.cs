using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShopManager.Server.Authorization.Interfaces;
using ShopManager.Server.Dto;
using ShopManager.Server.Interfaces;

namespace ShopManager.Server.Controllers
{
    [Route("api/[controller]")]
    [Authorize(Roles = Roles.Admin)]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly ISignInService _signInService;
        private readonly IUserService _userService;

        public AuthController(ISignInService signInService, IUserService registerService)
        {
            _signInService = signInService;
            _userService = registerService;
        }

        [HttpPost("signIn")]
        [AllowAnonymous]
        public async Task<IActionResult> SignIn(AdminSignInDto userSignInDto)
        {
            var token = await _signInService.SignIn(userSignInDto);
            return Ok(token);
        }

        [HttpPost("registerManager")]
        public async Task<IActionResult> Register(UserRegisterDto userSignInDto)
        {
            var result = await _userService.RegisterManager(userSignInDto);

            if (result.IsValid)
            {
                return Ok();
            }

            return BadRequest(result);
        }

        [HttpDelete("{login}")]
        public async Task<IActionResult> DeleteManager(string login)
        {
            await _userService.DeleteAsync(login);
            return Ok();
        }

        [HttpPatch]
        public async Task<IActionResult> UpdatePassword(UpdatePasswordDto request)
        {
            var result = await _userService.UpdateAdminPassword(request.Login, request.CurrentPassword, request.NewPassword);

            if(result.Succeeded)
            {
                return Ok();
            }
            return BadRequest();
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _userService.GetAllAsync());
        }

        [Authorize(Roles = $"{Roles.Admin},{Roles.Manager}")]
        [HttpPost("checkToken")]
        public IActionResult CheckToken()
        {
            return Ok();
        }
    }
}
