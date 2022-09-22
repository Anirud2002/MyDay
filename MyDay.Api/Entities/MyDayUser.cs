using System;
namespace MyDay.Api.Entities
{
	public class MyDayUser
	{
		public string AppUserID { get; set; } = string.Empty;
		public string UserName { get; set; } = string.Empty;
		public string FirstName { get; set; } = string.Empty;
		public string LastName { get; set; } = string.Empty;
		public DateTime Joined { get; set; }
		public List<MyDay> MyDays{get; set;} = new List<MyDay>();
		public List<Journals> MyJournals { get; set; } = new List<Journals>();
		public string City { get; set; } = string.Empty;
		public List<string> Links { get; set; } = new List<string>();
		public string Description { get; set; } = string.Empty;
	}
}

