namespace ShopManager.Server.Dto
{
    public class UpdatePasswordDto
    {
        public string Login { get; set; }

        public string CurrentPassword { get; set; }

        public string NewPassword { get; set; }
    }
}
