using System;
using Amazon.DynamoDBv2.DataModel;

namespace MyDay.Api.Entities
{
	[DynamoDBTable("MyDayUser")]
	public class MyDayUser
	{
		[DynamoDBHashKey]
		public string UserName { get; set; } = string.Empty;
		public string AppUserID { get; set; } = string.Empty;
		public string Email { get; set; } = string.Empty;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public byte[] PasswordHash { get; set; } = new byte[0];
		public byte[] PasswordSalt { get; set; } = new byte[0];
		public DateTime Joined { get; set; }
		public string City { get; set; } = string.Empty;
		// github, linkedIn, other social media
		public List<string> Links { get; set; } = new List<string>();
		public string Description { get; set; } = string.Empty;
	}
}

