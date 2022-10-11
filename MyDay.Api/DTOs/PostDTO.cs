using System;
using MyDay.Api.Entities;

namespace MyDay.Api.DTOs
{
	public class PostDTO
	{
		public string PostedOn { get; set; } = string.Empty;
		public string Body { get; set; } = string.Empty;
		public string Category { get; set; } = string.Empty;
		public List<string> Hashtags { get; set; } = new List<string>();
	}
}

