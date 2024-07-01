using Microsoft.IdentityModel.Tokens;
using ShopManager.Server.Authorization.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ShopManager.Server.Authorization.Services
{
    public class JwtService : IJwtService
    {
        private readonly JwtSecurityTokenHandler _jwtSecurityTokenHandler = new();
        private readonly JwtOptions _jwtOptions;

        public JwtService(JwtOptions jwtOptions)
        {
            _jwtOptions = jwtOptions;
        }

        public string CreateToken(string userName, string role)
        {
            var claims = GetClaims(userName, role);

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtOptions.Key));
            var signingCredentials = new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(claims: claims, signingCredentials: signingCredentials, audience: _jwtOptions.Audience, issuer: _jwtOptions.Issuer);
            var stringToken = _jwtSecurityTokenHandler.WriteToken(token);

            return stringToken;
        }

        private List<Claim> GetClaims(string userName, string role)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim(ClaimTypes.Role, role)
            };

            return claims;
        }
    }
}
