using System;
using Amazon.DynamoDBv2.DataModel;

namespace MyDay.Api.Entities
{
	[DynamoDBTable("MyDayPost")]
	public class MyDayPost
	{
		[DynamoDBHashKey]
		public string AppUserID { get; set; } = string.Empty;
		[DynamoDBRangeKey]
		public DateTime PostedOn { get; set; }
		public string MyDayPostID { get; set; } = string.Empty;
		public string Body { get; set; } = string.Empty;
		public List<string> Hastags { get; set; } = new List<string>();
		public int Likes { get; set; }
		public ICollection<Comment>? Comments { get; set; }
		// stores the liked users AppUserID
		public List<string> LikedBy { get; set; } = new List<string>();
	}
}

