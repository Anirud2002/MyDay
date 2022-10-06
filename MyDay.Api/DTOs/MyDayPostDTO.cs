﻿using System;
using MyDay.Api.Entities;

namespace MyDay.Api.DTOs
{
	public class MyDayPostDTO
	{
		public string PostedOn { get; set; }
		public string Body { get; set; } = string.Empty;
		public List<string> Hashtags { get; set; } = new List<string>();
	}
}

