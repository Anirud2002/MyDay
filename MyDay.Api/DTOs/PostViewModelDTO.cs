using System;
using MyDay.Api.Entities;

namespace MyDay.Api.DTOs
{
	public class PostViewModelDTO
	{
		public string PostID { get; set; } = string.Empty;
		public string Category { get; set; } = string.Empty;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public string UserName { get; set; } = string.Empty;
		public DateTime PostedOn { get; set; }
		public string Body { get; set; } = string.Empty;
		public List<string> Hashtags { get; set; } = new List<string>();
		public int Likes { get; set; }
		public List<Comment>? Comments { get; set; }
		public List<string> LikedBy { get; set; } = new List<string>();
	}
}


