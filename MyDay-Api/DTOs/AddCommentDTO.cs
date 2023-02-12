using System;
namespace MyDayApi.DTOs
{
	public class AddCommentDTO
	{
		public string PostID { get; set; } = string.Empty;
		public string Comment { get; set; } = string.Empty;
		public string UserName { get; set; } = string.Empty;
		public long PostCreatedDate { get; set; }
	}
}

