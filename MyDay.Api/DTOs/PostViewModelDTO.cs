using System;
using MyDay.Api.Entities;

namespace MyDay.Api.DTOs
{
	public class PostViewModelDTO
	{
		public string PostID { get; set; } = string.Empty;
		public string Category { get; set; } = string.Empty;
		public DateTime PostedOn { get; set; }
		public string Body { get; set; } = string.Empty;
		public List<string> Hashtags { get; set; } = new List<string>();
	}
}


