using System;
namespace MyDay.Api.Entities
{
	public class Journals
	{
		public string AppUserID { get; set; } = string.Empty;
		public string MyJournalID { get; set; } = string.Empty;
		public DateTime PostedOn { get; set; }
		public string Body { get; set; } = string.Empty;
		public string Category { get; set; } = string.Empty;
		public int Likes { get; set; }
		public ICollection<Comment>? Comments { get; set; }
		// stores the liked users AppUserID
		public List<string> LikedBy { get; set; } = new List<string>();
	}
}

