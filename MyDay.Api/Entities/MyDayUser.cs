using System;
namespace MyDay.Api.Entities
{
	public class MyDayUser
	{
		public string AppUserID { get; set; } = string.Empty;
		public string UserName { get; set; } = string.Empty;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public byte[]? PasswordHash { get; set; }
		public byte[]? PasswordSalt { get; set; }
		public DateTime Joined { get; set; }
		public string City { get; set; } = string.Empty;
		// github, linkedIn, other social media
		public List<string> Links { get; set; } = new List<string>();
		public string Description { get; set; } = string.Empty;
	}
}

