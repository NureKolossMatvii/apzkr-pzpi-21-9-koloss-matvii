namespace ShopManager.Server.Authorization
{
    public class JwtOptions
    {
        public string Key { get; set; }
        public string Audience { get; set; }
        public string Issuer { get; set; }

        public const string Jwt = "Jwt";
    }
}
