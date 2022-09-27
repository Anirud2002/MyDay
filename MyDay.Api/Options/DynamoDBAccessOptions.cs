using System;
namespace MyDay.Api.Options
{
	public class DynamoDBAccessOptions
	{
		public const string AccessName = "MyDayDB";
		public string AccessKey { get; set; } = string.Empty;
		public string SecretAccessKey { get; set; } = string.Empty;
	}
}

