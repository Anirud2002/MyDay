using System;
namespace MyDay.Api.Entities
{
	public class Comment
	{
		// When someone posts a comment, the DB queries that particular post or journal
		// and then updates the comments list my adding the new comment with this
		// information
		public string AppUserID { get; set; } = string.Empty;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public DateTime CommentedOn { get; set; }
		public string CommentBody { get; set; } = string.Empty;
	}
}

